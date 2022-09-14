import Requests from "./requests.js"

export class DashUser {
    static token = localStorage.getItem("kenzieEmpresa@token")

    static verifyToken() {
        if (!this.token) {
            window.location.replace("/index.html")
        }
    }

    static async listFunc(response) {

        const youFunc = document.querySelector(".main__departmentFunc")

        const messageLi = document.createElement("li")
        const message = document.createElement("p")

        message.classList.add("text2", "messageDepartment")

        console.log(response)
        if (response.length == 0) {
            message.innerText = "Você ainda não está cadastrado em nenhum departamento"
            messageLi.append(message)
            youFunc.append(messageLi)
        } else {
            const arr = response.forEach((elem) => {
                message.innerHTML = `<p class="text2">Nome: ${elem.username}</p> <p class="text2"> Email: ${elem.email}</p> <p class="text2">Nível: ${elem.professional_level}</p>`
                messageLi.append(message)
                youFunc.append(messageLi)
            })

        }

        youFunc.addEventListener("click", (e) => {
            message.classList.toggle("messageOn")
        })
    }
    static async listDepartment(response) {
        const youDepartment = document.querySelector(".main__youDepartment")
        const messageLiError = document.createElement("li")
        const messageError = document.createElement("p")
        const messageLi = document.createElement("li")
        const message = document.createElement("p")
        const youCompanie = document.querySelector(".main__youCompanie")

        const messageLiCompanieError = document.createElement("li")
        const messageErrorCompanie = document.createElement("p")
        const messageLiCompanie = document.createElement("li")
        const messageCompanie = document.createElement("p")

        messageError.innerText = "Você ainda não está cadastrado em nenhum departamento"
        messageError.classList.add("text2", "messageDepartment")
        messageLiError.append(message)


        const loop = response.forEach((elem) => {
            message.innerText = `O seu departamento é: ${elem.sectors.description}`
            messageErrorCompanie.innerText = "Você ainda não está cadastrado em nenhum departamento"
            messageErrorCompanie.classList.add("text2", "messageDepartment")
            messageLiCompanieError.append(messageErrorCompanie)
            messageCompanie.innerText = `A sua empresa é: ${elem.name}`
            messageLiCompanie.append(messageCompanie)
            messageCompanie.classList.add("text2", "messageAppear")
        })

        messageLi.append(message)
        message.classList.add("text2", "messageAppear")

        youDepartment.addEventListener("click", (e) => {
            message.classList.toggle("messageOn")

            if (response.error) {
                youDepartment.append(messageLi)
            } else {
                youDepartment.append(message)
            }
        })

        youCompanie.addEventListener("click", (e) => {
            messageCompanie.classList.toggle("messageOn")

            if (response.error) {
                messageLiCompanieError.append(messageErrorCompanie)
            } else {
                youCompanie.append(messageCompanie)
            }
        })
    }

    static async editProfile() {
        const btnProfile = document.querySelector(".nav__profile")
        const section = document.querySelector(".main__sectionFirst")
        const div = document.querySelector(".section__div--info")
        const footer = document.querySelector(".footer__all")
        const closeModal = document.querySelector(".modal__close")
        const modalProfile = document.querySelector(".modal__profile")


        btnProfile.addEventListener("click", (e) => {
            modalProfile.classList.toggle("showModal")
            section.classList.toggle("desfocus")
            div.classList.toggle("desfocus")
            footer.classList.toggle("desfocus")
        })

        closeModal.addEventListener("click", (e) => {
            e.preventDefault()
            modalProfile.classList.remove("showModal")
            section.classList.remove("desfocus")
            div.classList.remove("desfocus")
            footer.classList.remove("desfocus")
        })

        const sendBtn = document.querySelector(".form__button--dados")
        sendBtn.addEventListener("click", (e) => {
            e.preventDefault()
            const formEmail = document.querySelector(".form__inputLog--email")
            const formUser = document.querySelector(".form__inputLog--user")
            const formPass = document.querySelector(".form__inputLog--pass")

            const body = {
                "username": formUser.value,
                "email": formEmail.value,
                "password": formPass.value

            }
            Requests.updateProfile(body)
        })

    }

    static async backToHome() {
        const outBtn = document.querySelector(".nav__out")

        outBtn.addEventListener("click", (e) => {
            localStorage.removeItem("kenzieEmpresa@token")
            window.location.replace("/index.html")
        })
    }

    static async deleteAccount() {
        const btnDelet = document.querySelector(".form__button--delete")
        btnDelet.addEventListener("click", (e) => {

        })

    }
}