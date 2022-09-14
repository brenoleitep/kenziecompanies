import Requests from "./requests.js"

export class DashAdmin {

    static token = localStorage.getItem("kenzieEmpresa@token")

    static verifyToken() {
        if (!this.token) {
            window.location.replace("/index.html")
        }
    }

    static async listHeader() {
        const img = document.querySelector(".header__img")
        const texts = document.querySelector(".header__texts")

        img.addEventListener("click", (e) => {
            texts.classList.toggle("displayFlex")

        })

    }

    static async companies(response) {
        const section = document.querySelector(".section__companie")
        const sectionDiv = document.querySelector(".section__companie--div")
        const sectionUl = document.querySelector(".section__companie--ul")

        const data = response.forEach((elem, index) => {
            sectionUl.classList.add("main__div")
            const tagLi = document.createElement("li")
            const titleCompanie = document.createElement("h2")
            titleCompanie.classList.add("title2")
            const titleDesc = document.createElement("p")
            const id = document.createElement("p")
            id.classList.add("text2")
            titleDesc.classList.add("text2")
            const openOn = document.createElement("span")
            openOn.classList.add("text2")

            titleCompanie.innerText = elem.name
            titleDesc.innerText = `Setor: ${elem.sectors.description}`
            openOn.innerText = `Aberto: ${elem.opening_hours}`
            id.innerText = `Id: ${elem.uuid}`

            tagLi.append(titleCompanie, titleDesc, openOn, id)
            sectionUl.append(tagLi)
            section.append(sectionUl)

            tagLi.id = elem.uuid
        })

    }

    static async noWorkers(response) {
        const tagUlNoWork = document.querySelector(".section__contract--ul")
        const section = document.querySelector(".main")
        const tagUlDepart = document.querySelector(".section__department")

        const responseLoop = response.forEach((elem) => {
            const tagLi = document.createElement("li")
            tagLi.classList.add("section__contract--li")
            const nameDev = document.createElement("h2")
            const email = document.createElement("p")
            const kindOfWork = document.createElement("p")
            const level = document.createElement("p")
            const hire = document.createElement("button")

            nameDev.classList.add("text1")
            email.classList.add("tex2")
            kindOfWork.classList.add("text2")
            level.classList.add("text2")
            hire.classList.add("btnHire")

            nameDev.innerText = `Nome: ${elem.username}`
            email.innerText = `Email: ${elem.email}`
            kindOfWork.innerText = `Modalidade: ${elem.kind_of_work}`
            level.innerText = `Level: ${elem.professional_level}`
            hire.innerText = "Contratar"

            tagLi.append(nameDev, email, kindOfWork, level, hire)
            tagUlNoWork.append(tagLi)

            hire.addEventListener("click", (e) => {
                e.preventDefault()

                const sectionBg = document.querySelector(".main__sectionFirst")
                const sectionComp = document.querySelector(".section__companie")
                const sectionHire = document.querySelector(".section__contract")
                const sectionDepart = document.querySelector(".section__department")
                const sectionSector = document.querySelector(".section__sector")

                sectionBg.classList.add("desfocus")
                sectionComp.classList.add("desfocus")
                sectionHire.classList.add("desfocus")
                sectionDepart.classList.add("desfocus")
                sectionSector.classList.add("desfocus")


                const modalHire = document.createElement("div")
                modalHire.classList.add("modalHire")
                const closeModal = document.createElement("p")
                closeModal.classList.add("close__modal", "text1")
                closeModal.innerText = "X"
                const h2 = document.createElement("h2")
                h2.classList.add("title2")
                h2.innerText = "Contratar Dev"
                const p = document.createElement("p")
                p.classList.add("text1")
                p.innerText = `Nome: ${elem.username}`
                const h3 = document.createElement("h3")
                h3.classList.add("text1")
                h3.innerText = `Level: ${elem.professional_level}`
                const input = document.createElement("input")
                input.classList.add("inputDefault", "inputDefault::placeholder", "inputDefault:active", "form__inputLog--pass")
                input.placeholder = "Departamento contratante"
                const btnHire = document.createElement("button")
                btnHire.classList.add("btnHire")
                btnHire.innerText = "Contratar"

                modalHire.append(h2, closeModal, p, h3, input, btnHire)
                section.append(modalHire)
                modalHire.classList.toggle("showModal")

                closeModal.addEventListener("click", (e) => {
                    modalHire.classList.remove("showModal")
                    sectionBg.classList.remove("desfocus")
                    sectionComp.classList.remove("desfocus")
                    sectionHire.classList.remove("desfocus")
                    sectionDepart.classList.remove("desfocus")
                    sectionSector.classList.remove("desfocus")
                })
                btnHire.addEventListener("click", (e) => {
                    const body = {
                        "user_uuid": elem.uuid,
                        "department_uuid": input.value
                    }
                    console.log(body)
                    Requests.hireDev(body)
                })
            })

        })
    }

    static async departments(response) {

        const tagUlDepart = document.querySelector(".section__department--ul")

        const responseLoop = response.forEach((elem) => {
            const tagLi = document.createElement("li")
            tagLi.classList.add("section__department--li")
            const nameDepart = document.createElement("h2")
            const description = document.createElement("p")
            const id = document.createElement("p")


            nameDepart.classList.add("text1")
            id.classList.add("text3")
            description.classList.add("text2")

            nameDepart.innerText = `Nome: ${elem.name}`
            description.innerText = `Descrição: ${elem.description}`
            id.innerText = `Id: ${elem.uuid}`

            tagLi.append(nameDepart, description, id)
            tagUlDepart.append(tagLi)
            /*------------------------------------------------------------*/

        })
        return responseLoop

    }

    static async dismiss() {
        const dismiss = document.querySelector(".nav__dismiss")
        const section = document.querySelector(".main")


        dismiss.addEventListener("click", (e) => {
            const sectionBg = document.querySelector(".main__sectionFirst")
            const sectionComp = document.querySelector(".section__companie")
            const sectionHire = document.querySelector(".section__contract")
            const sectionDepart = document.querySelector(".section__department")
            const sectionSector = document.querySelector(".section__sector")


            e.preventDefault()

            const dismissModal = document.createElement("div")
            dismissModal.classList.add("modal__dismiss")
            const closeModal = document.createElement("p")
            closeModal.classList.add("close__modal", "text1")
            closeModal.innerText = "X"
            const h2 = document.createElement("h2")
            h2.classList.add("title2")
            h2.innerText = "Demitir dev"
            const input = document.createElement("input")
            input.classList.add("inputDefault", "inputDefault::placeholder", "inputDefault:active", "form__inputLog--pass")
            input.placeholder = "Id do dev"
            const btnDismiss = document.createElement("button")
            btnDismiss.classList.add("btnDismiss")
            btnDismiss.innerText = "Demitir"

            dismissModal.classList.add("showModal")

            dismissModal.append(closeModal, h2, input, btnDismiss)
            section.append(dismissModal)

            closeModal.addEventListener("click", (e) => {
                dismissModal.classList.remove("showModal")

            })

            btnDismiss.addEventListener("click", (e) => {
                e.preventDefault()
                
                Requests.dismissDev(input.value)
                console.log(input.value)
            })
        })
    }

    static async editProfile() {
        const btnProfile = document.querySelector(".nav__profile")
        const footer = document.querySelector(".footer__all")
        const closeModal = document.querySelector(".modal__close")
        const modalProfile = document.querySelector(".modal__profile")


        btnProfile.addEventListener("click", (e) => {
            modalProfile.classList.toggle("showModal")
            footer.classList.toggle("desfocus")
        })

        closeModal.addEventListener("click", (e) => {
            e.preventDefault()
            modalProfile.classList.remove("showModal")
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

    static async newDepartment() {
        const activeModal = document.querySelector(".nav__create")
        const modal = document.querySelector(".modal__create")
        const closeModal = document.querySelector(".modal__depart--close")
        const btnCreate = document.querySelector(".form__button--create")
        const name = document.querySelector(".form__input--name")
        const description = document.querySelector(".form__inputLog--descrip")
        const id = document.querySelector(".form__input--companieId")

        activeModal.addEventListener("click", (e) => {
            modal.classList.add("showModal")
        })

        closeModal.addEventListener("click", (e) => {
            e.preventDefault()
            modal.classList.remove("showModal")
        })

        btnCreate.addEventListener("click", (e) => {
            e.preventDefault()

            const body = {
                "name": name.value,
                "description": description.value,
                "company_uuid": id.value
            }
            console.log(body)
            Requests.createDepartment(body)
        })
    }

    static async editCompanie() {
        const btnOpenModal = document.querySelector(".nav__editDepartment")
        const departmentModal = document.querySelector(".modal__editDepartment")
        const btnEdit = document.querySelector(".form__button--edit")
        const closeModal = document.querySelector(".modal__edit--close")
        const input = document.querySelector(".form__input--newDescrip")
        const inputId = document.querySelector(".form__input--id")

        btnOpenModal.addEventListener("click", (e) => {
            departmentModal.classList.add("showModal")
        })

        closeModal.addEventListener("click", (e) => {
            e.preventDefault()
            departmentModal.classList.remove("showModal")
        })

        btnEdit.addEventListener("click", (e) => {
            e.preventDefault()

            const body = {
                "description": input.value
            }
            const id = inputId.value

            Requests.editDepartment(body, id)
        })

    }

    static async listSectors(response) {
        const tagUlSector = document.querySelector(".section__sector--ul")

        const responseLoop = response.forEach((elem) => {
            const tagLi = document.createElement("li")
            tagLi.classList.add("section__sector--li")

            const description = document.createElement("p")

            description.classList.add("text2")
            description.innerText = `Descrição: ${elem.description}`

            tagLi.append(description)
            tagUlSector.append(tagLi)
        })
    }

    static async deletDepartment() {
        const btnModal = document.querySelector(".nav__deletDepartment")
        const divModal = document.querySelector(".modal__delet")
        const closeModal = document.querySelector(".modal__delet--close")
        const sendInfo = document.querySelector(".form__button--delet")

        btnModal.addEventListener("click", (e) => {
            divModal.classList.toggle("showModal")

        })

        closeModal.addEventListener("click", (e) => {
            divModal.classList.remove("showModal")
        })

        sendInfo.addEventListener("click", (e) => {
            e.preventDefault()
            const input = document.querySelector(".form__input--delet")
            const id = input.value
            console.log(id)
            Requests.deletDepartments(id)
        })
    }
}

