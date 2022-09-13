import bcrypt from "bcrypt";
import config from "../config";

const password = config.ADMIN_PASSWORD as string;
const hash = bcrypt.hashSync(password, 10);

const Admin = [
  {
    _id: "624eb07a3c2dafd2b3cf43ea",
    email: "admin@donda.com",
    firstName: "Admin",
    lastName: "Donda",
    password: hash,
    role: "admin",
    verified: true,
    accountNo: "0000000000",
    phone: "+234810000000"
  },
  {
    _id: "624eb07a3c2dafd2b3cf43eb",
    email: "uadmin@donda.com",
    firstName: "User",
    lastName: "Admin",
    password: hash,
    role: "admin",
    verified: true,
    accountNo: "0000000001",
    phone: "+2348100000001"
  }

];

export default Admin;
