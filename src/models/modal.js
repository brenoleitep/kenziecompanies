export class Modal {
    static modalLogin() {
        const btnLogin = document.querySelector(".nav__login")
        const section = document.querySelector(".main__section")
        const loginModal = document.querySelector(".modal__login")
        const cadastroModal = document.querySelector(".modal__cadastro")
        const btnCadastro = document.querySelector(".nav__cadastro")
        const closeModal = document.querySelector(".modal__close")
        const btnToCad = document.querySelector(".form__button--cadastre")
        const btnToLog = document.querySelector(".form__button--cadLog")
        const newSecao = document.querySelector(".main__sectionFirst")
        const footer = document.querySelector("footer")


        btnLogin.addEventListener("click", (e) => {
            e.preventDefault()
            loginModal.classList.add("showModal")
            section.classList.add("desfocus")
            newSecao.classList.add("desfocus")
            footer.classList.add("desfocus")
            cadastroModal.classList.remove("showModal")
        })

        btnCadastro.addEventListener("click", (e) => {
            e.preventDefault()
            loginModal.classList.remove("showModal")
            cadastroModal.classList.add("showModal")
            section.classList.add("desfocus")
            newSecao.classList.add("desfocus")
            footer.classList.add("desfocus")

        })

        closeModal.addEventListener("click", (e) => {
            e.preventDefault()
            loginModal.classList.remove("showModal")
            section.classList.remove("desfocus")
            newSecao.classList.remove("desfocus")
            footer.classList.remove("desfocus")
        })

        btnToCad.addEventListener("click", (e) => {
            e.preventDefault()
            loginModal.classList.remove("showModal")
            section.classList.add("desfocus")
            newSecao.classList.add("desfocus")
            footer.classList.add("desfocus")
            cadastroModal.classList.add("showModal")
        })

        btnToLog.addEventListener("click", (e) => {
            e.preventDefault()
            loginModal.classList.add("showModal")
            section.classList.add("desfocus")
            newSecao.classList.add("desfocus")
            footer.classList.add("desfocus")
            cadastroModal.classList.remove("showModal")
        })
    }
}