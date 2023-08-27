import { connection } from "../../config/dbConfig";
import { MysqlError } from "mysql";

const saveDepartment = async (name: string) => {
  const insertQuery = "INSERT INTO department (name) VALUES (?)";
  const values = [name];
  return new Promise((resolve, reject) => {
    connection.query(
      insertQuery,
      values,
      (error: MysqlError | null, results: any[]) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const getByname = async (name: string) => {
  const Query = "SELECT * FROM department where name = ?";
  return new Promise((resolve, reject) => {
    connection.query(
      Query,
      [name],
      (error: MysqlError | null, results: any[]) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const getByid = async (id: number) => {
  const Query = "SELECT * FROM department WHERE id = ?";
  return new Promise((resolve, reject) => {
    connection.query(
      Query,
      [id],
      (error: MysqlError | null, results: any[]) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
          
        }
      }
    );
  });
};

const getAll = async () => {
  const Query = "SELECT id,name FROM department";
  return new Promise((resolve, reject) => {
    connection.query(Query, (error: MysqlError | null, results: any[]) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const updateByid = async ({ id, name }: { id: number; name: string }) => {
  const Query = "UPDATE department SET name = ? WHERE id = ? ";
  return new Promise((resolve, reject) => {
    connection.query(
      Query,
      [name, id],
      (error: MysqlError | null, results: any[]) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};
const deleteByid = async (id: number) => {
  const Query = "DELETE from department where id = ?";
  return new Promise((resolve, reject) => {
    connection.query(
      Query,
      [id],
      (error: MysqlError | null, results: any[]) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};
export default {
  saveDepartment,
  getByname,
  getByid,
  getAll,
  deleteByid,
  updateByid,
};
