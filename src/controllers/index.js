import { ListCompanies, Login } from "../models/homepage.js";
import { Modal } from "../models/modal.js";
import Requests from "../models/requests.js";

Requests.requestCompaniesHome()
Login.makeLogin()
Login.makeCadastro()
Modal.modalLogin()