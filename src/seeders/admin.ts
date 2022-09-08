import bcrypt from "bcrypt";

const password = "password";
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
    email: "admin@admin.com",
    firstName: "Admin2",
    lastName: "Donda2",
    password: hash,
    role: "admin",
    verified: true,
    accountNo: "0000000001",
    phone: "+2348100000001"
  },
  {
    _id: "6312f2ad4112915848789ecc",
    email: "adeosundeji2@gmail.com",
    firstName: "Adeosun",
    lastName: "Deji",
    password: hash,
    role: "admin",
    verified: true,
    accountNo: "2080108757",
    phone: "+09076488655"
  }

];

export default Admin;
