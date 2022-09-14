import Requests from "./requests.js"

export class Login {
    static makeLogin() {
        const inputEmail = document.querySelector(".form__inputLog--email")
        const pass = document.querySelector(".form__inputLog--pass")
        const btnLogin = document.querySelector(".form__button--login")

        btnLogin.addEventListener("click", (e) => {
            e.preventDefault()

            const body = {
                "email": inputEmail.value,
                "password": pass.value
            }

            Requests.requestLogin(body)
        })
    }

    static makeCadastro() {
        const inputEmail = document.querySelector(".form__inputCad--email")
        const inputPass = document.querySelector(".form__inputCad--pass")
        const inputUser = document.querySelector(".form__inputCad--username")
        const inputType = document.querySelector(".form__inputCad--prof")
        const btnCadastro = document.querySelector(".form__button--cadastrar")

        btnCadastro.addEventListener("click", (e) => {
            e.preventDefault()

            const body = {
                "password": inputPass.value,
                "email": inputEmail.value,
                "professional_level": inputType.value.toLowerCase(),
                "username": inputUser.value
            }

            Requests.requestCadastro(body)
        })
    }
}

export class ListCompanies {
    static listAllCompanies(response) {
        const section = document.querySelector(".main__section")
        const main = document.querySelector(".main__homepage")
        const tagUl = document.createElement("ul")
        const body = document.body

        console.log(response)

        const data = response.forEach((elem, index) => {
            tagUl.classList.add("main__div")
            const tagLi = document.createElement("li")
            const titleCompanie = document.createElement("h2")
            titleCompanie.classList.add("title2")
            const titleDesc = document.createElement("p")
            titleDesc.classList.add("text2")
            const openOn = document.createElement("span")
            openOn.classList.add("text2")

            titleCompanie.innerText = elem.name
            titleDesc.innerText = `Setor: ${elem.sectors.description}`
            openOn.innerText = `Aberto: ${elem.opening_hours}`

            tagLi.append(titleCompanie, titleDesc, openOn)
            tagUl.append(tagLi)
            section.append(tagUl)

            tagLi.id = elem.uuid

            tagLi.addEventListener("click", (e) => {
                section.classList.add("desfocus")
                const id = tagLi.id
                if (elem.uuid == id) {
                    const divItem = document.createElement("div")
                    divItem.classList.add("modal__empresa")
                    const titleCompanie = document.createElement("h2")
                    titleCompanie.classList.add("title2")
                    const titleDesc = document.createElement("p")
                    titleDesc.classList.add("text2")
                    const openOn = document.createElement("span")
                    openOn.classList.add("text2")
                    const closeModal = document.createElement("h3")
                    closeModal.classList.add("modal__close", "text1")
                    const descricao = document.createElement("p")
                    descricao.classList.add("text2")

                    titleCompanie.innerText = elem.name
                    titleDesc.innerText = `Setor: ${elem.sectors.description}`
                    openOn.innerText = `Aberto: ${elem.opening_hours}`
                    closeModal.innerText = "X"
                    descricao.innerText = `Descrição: ${elem.description}`

                    divItem.append(titleCompanie, titleDesc, descricao, openOn, closeModal)
                    main.append(divItem)

                    closeModal.addEventListener("click", (e) => {
                        e.preventDefault()
                        divItem.remove()
                        section.classList.remove("desfocus")
                    })

                }
            })
        })
        return data
    }

    static filterCompanies(response) {
        const mainDiv = document.querySelector(".main__div")
        const tagUl = document.createElement("ul")
        const arrayLabels = []

        const select = document.querySelector(".section__list")
        let option = document.createElement("option")

        const data = response.forEach((elem, index) => {

            arrayLabels.push(elem.sectors.description)

            select.addEventListener("click", (e) => {
                tagUl.innerHTML = ""
                const labels = e.target

                for (let i = 0; i < labels.length; i++) {
                    if (elem.sectors.description == labels[i].label) {
                        // tagUl.innerHTML = ""
                        const tagLi = document.createElement("li")
                        const titleCompanie = document.createElement("h2")
                        titleCompanie.classList.add("title2")
                        const titleDesc = document.createElement("p")
                        titleDesc.classList.add("text3")
                        const openOn = document.createElement("span")
                        openOn.classList.add("text2")

                        titleCompanie.innerText = elem.name
                        titleDesc.innerText = `Setor: ${elem.sectors.description}`
                        openOn.innerText = `Aberto: ${elem.opening_hours}`

                        tagLi.append(titleCompanie, titleDesc, openOn)
                        tagUl.append(tagLi)
                        mainDiv.append(tagUl)
                    }
                }
            })

        })
        const arr = [... new Set(arrayLabels)]
        arr.filter((elemento) => {
            let option = document.createElement("option")
            option.label = elemento
            select.append(option)


        })
    }
}