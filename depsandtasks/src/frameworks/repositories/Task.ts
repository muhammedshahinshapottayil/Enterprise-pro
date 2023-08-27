import { connection } from "../../config/dbConfig";
import { MysqlError } from "mysql";
const saveTask = ({
  name,
  fk_department,
}: {
  name: string;
  fk_department: number;
}) => {
  return new Promise((resolve, reject) => {
    const insertQuery = "INSERT INTO task (name, fk_department) VALUES (?, ?)";
    const values = [name, fk_department];
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

const updateTasks = ({
  name,
  fk_department,
  id,
}: {
  name: string;
  fk_department: number;
  id: number;
}) => {
  return new Promise((resolve, reject) => {
    const insertQuery =
      "UPDATE task SET name = ? , fk_department= ? WHERE id = ?";
    const values = [name, fk_department, id];
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

const getByname = ({
  name,
  fk_department,
}: {
  name: string;
  fk_department: number;
}) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT task.*,department.name as Depname  FROM task, department WHERE department.id = task.fk_department AND task.name = ? and task.fk_department= ?";
    connection.query(
      query,
      [name, fk_department],
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

const getByid = (id: number) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT task.*,department.name as Depname  FROM task, department WHERE department.id = task.fk_department AND task.id = ?";
    connection.query(
      query,
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

const getByDepid = (id: number) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT task.*,department.name as Depname FROM task, department WHERE department.id = task.fk_department AND department.id = ?";
    connection.query(
      query,
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

const getAll = () => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT task.*,department.name as Depname  FROM task, department WHERE department.id = task.fk_department";
    connection.query(query, (error: MysqlError | null, results: any[]) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const deleteByid = (id: number) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE  FROM task where id = ?";
    connection.query(
      query,
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
  saveTask,
  getByname,
  getByid,
  getAll,
  getByDepid,
  updateTasks,
  deleteByid,
};
