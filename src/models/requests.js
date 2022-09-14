import { Toast } from "./toast.js";
import { DashAdmin } from "./dashboardAdmin.js";
import { DashUser } from "./dashboardUser.js";
import { ListCompanies } from "./homepage.js";

class Requests {
    static token = localStorage.getItem("kenzieEmpresa@token")
    static uuid = localStorage.getItem("kenzieEmpresa@uuid")

    static async requestLogin(data) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const result = await fetch('http://localhost:6278/auth/login', options)
            .then(response => response.json())
            .then(response => {
                if (response.token !== undefined) {
                    localStorage.setItem("kenzieEmpresa@token", response.token)
                    localStorage.setItem("kenzieEmpresa@uuid", response.uuid)
                    Toast.create("Login efetuado com sucesso", "green")
                } else {
                    Toast.create("Email ou senha inválidos", "red")
                }
                if (response.is_admin == false) {
                    window.location.replace("/src/pages/dashboardUser.html")
                } else if (response.is_admin == true) {
                    window.location.replace("/src/pages/dashboardAdmin.html")
                }
            })
            .catch((err) => {
                console.log(err)
            });

        return result
    }

    static async requestCadastro(data) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const result = await fetch('http://localhost:6278/auth/register/user', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.error) {
                    Toast.create("Cadastro inválido, tente novamente", "red")
                } else {
                    Toast.create("Cadastro efetuado com sucesso", "green")
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    static async requestCompanies() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        await fetch('http://localhost:6278/companies', options)
            .then(response => response.json())
            .then(response => {
                DashAdmin.companies(response)
            })
            .catch(err => console.log(err));
    }

    static async requestCompaniesHome () {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        await fetch('http://localhost:6278/companies', options)
            .then(response => response.json())
            .then(response => {
                ListCompanies.listAllCompanies(response)
                ListCompanies.filterCompanies(response)
            })
            .catch(err => console.log(err));
    }

    static async requestCompaniesUser () {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        await fetch('http://localhost:6278/companies', options)
            .then(response => response.json())
            .then(response => {
               DashUser.listDepartment(response)
            })
            .catch(err => console.log(err));
    }

    static async requestFunc() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        await fetch('http://localhost:6278/users/departments/coworkers', options)
            .then(response => response.json())
            .then(response => {
                const arr = response.forEach((elem) => {
                    DashUser.listFunc(elem.users)
                })
            })
            .catch(err => console.error(err));
    }

    static async requestDepartments() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        await fetch('http://localhost:6278/users/departments', options)
            .then(response => response.json())
            .then(response => {
                DashUser.listDepartment(response)
            })
            .catch(err => console.error(err));
    }

    static async updateProfile(data) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`

            },
            body: JSON.stringify(data)
        };

        await fetch('http://localhost:6278/users', options)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    Toast.create("Dados inválidos, tente novamente", "red")
                } else {
                    Toast.create("Dados trocados com sucesso", "green")
                }
            })
            .catch(err => err);

    }

    static async noWork() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        await fetch('http://localhost:6278/admin/out_of_work', options)
            .then(response => response.json())
            .then(response => {
                DashAdmin.noWorkers(response)
            })
            .catch(err => console.error(err));
    }

    static async departments() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        await fetch('http://localhost:6278/departments', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                DashAdmin.departments(response)
            })
            .catch(err => console.error(err));
    }

    static async createDepartment(data) {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:6278/departments', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.error) {
                    Toast.create("Falha ao criar departamento, tente novamente", "red")
                } else {
                    Toast.create("Departamento criado com sucesso", "green")
                }
            })
            .catch(err => console.error(err));
    }

    static async editDepartment(data, id) {

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(data)
        };

        await fetch(`http://localhost:6278/departments/${id}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)

            })
            .catch(err => console.error(err));
    }

    static async listSector() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        fetch('http://localhost:6278/sectors', options)
            .then(response => response.json())
            .then(response => {
                DashAdmin.listSectors(response)
            })
            .catch(err => console.error(err));

    }

    static async deletDepartments(id) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        await fetch(`http://localhost:6278/departments/${id}`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));


    }

    static async hireDev(body) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        };

        fetch('http://localhost:6278/departments/hire/', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

    }

    static async dismissDev (data) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        };

        fetch(`http://localhost:6278/departments/dismiss/${data}`, options)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    Toast.create("Id inválido, tente novamente", "red")
                } else {
                    Toast.create("Dev demitido com sucesso", "green")
                }
            })
            .catch(err => console.error(err));

    }
}

export default Requests