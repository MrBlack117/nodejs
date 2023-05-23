module.exports = class User {
    constructor(email, password, isAdmin = false) {
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}