import LoginStore from "./LoginViewStore"

describe("LoginStore", () => {
    const store = LoginStore
    describe("email validation", () => {
        it("invalidate no @", () => {
            store.emailOnChange('asdf')
            expect(store.emailError).not.toEqual('')
        })
        it("invalidate level one domain", () => {
            store.emailOnChange('asdf@qqure')
            expect(store.emailError).not.toEqual('')
        })
        it("invalidate more than one @", () => {
            store.emailOnChange('qwerii@asdf@asdf')
            expect(store.emailError).not.toEqual('')
        })
        it("validate normal email", () => {
            store.emailOnChange('qwerii@asdf.co')
            expect(store.emailError).toEqual('')
        })
    })
    describe("password validation", () => {
        it("invalidate less than 8 chars", () => {
            store.passwordOnChange('1234567')
            expect(store.passwordError).not.toEqual('')
        })
        it("invalidate more than 15 chars", () => {
            store.passwordOnChange('1234567890123456')
            expect(store.passwordError).not.toEqual('')
        })
        it("validate normal password", () => {
            store.passwordOnChange('1234567890')
            expect(store.passwordError).toEqual('')
        })
    })
    describe("form validation", () => {
        it("valid email and invalid password -> invalid form", () => {
            store.emailOnChange('qwerii@asdf.co')
            store.passwordOnChange('123')
            store.validateForm()
            expect(store.isValid).toBeFalsy()
        })
        it("invalid email and valid password -> invalid form", () => {
            store.emailOnChange('qwerii@asdf@co')
            store.passwordOnChange('123456789')
            store.validateForm()
            expect(store.isValid).toBeFalsy()
        })
        it("valid email and valid password -> valid form", () => {
            store.emailOnChange('qwerii@asdf.co')
            store.passwordOnChange('123456789')
            store.validateForm()
            expect(store.isValid).toBeTruthy()
        })
    })
})
