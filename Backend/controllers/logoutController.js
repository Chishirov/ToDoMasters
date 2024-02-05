export const logoutController = async (req, res) => {
    res.clearCookie("token");
    res.clearCookie("JWTinfo");
    res.send({ msg: "erfolgreich ausgeloggt" });
}