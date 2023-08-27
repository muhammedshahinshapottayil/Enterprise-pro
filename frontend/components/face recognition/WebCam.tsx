import React, { useEffect, useRef, useState } from "react";
import { SetStateType } from "../../types/intefaces";
import WebCamera from "react-webcam";
import * as Utils from "../../utils/faceUtils";
function WebCam({
  setimageDescription,
  setFullimageDescription,
  onClose,
  imageDescription,
  FullimageDescription,
}: {
  setimageDescription: SetStateType<any>;
  setFullimageDescription: SetStateType<any>;
  onClose: any;
  imageDescription: any;
  FullimageDescription: any;
}) {
  const [previewImg, setpreviewImg] = useState<null | string | undefined>("");

  const camRef = useRef<WebCamera | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const camWidth = 500;
  const camHeight = 500;
  const selectedWebcam = "";
  useEffect(() => {
    const getData = async () => {
      if (FullimageDescription.length == 0) await Utils.loadAllModels();
    };
    getData();
    const capture = async () => {
      try {
        if (FullimageDescription.length == 0){
          if (
            camRef.current != undefined &&
            camRef.current != null &&
            camRef.current.video?.readyState === 4
          ) {
            const response: any = await Utils.getFaceDescription(
              camRef.current.getScreenshot()
            );
            setFullimageDescription(response);
            setimageDescription(response?.[0]?.descriptor);
          } 
        } else onClose()

      } catch (error) {
        console.log(error);
      }
    };

    let clear = setInterval(() => {
      capture();
    }, 200);
    return () => clearInterval(clear);
  }, []);

  return (
    <div>
      <div>
        <WebCamera
          muted={true}
          ref={camRef}
          audio={false}
          width={camWidth}
          height={camHeight}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            deviceId: selectedWebcam,
          }}
        />
      </div>
    </div>
  );
}

export default WebCam;
