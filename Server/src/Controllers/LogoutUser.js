async function UseLogout(req,res)
{
    const response = {
        message: "Logout Successful",
        error: false
    };

    try {
        res.clearCookie("access_token").json({ response });
    } catch (error) {
        console.error("Error during logout: ", error.message);
        response.message = "Logout Failed";
        response.error = true;
        res.status(500).json({ response });
    }
}
export default UseLogout