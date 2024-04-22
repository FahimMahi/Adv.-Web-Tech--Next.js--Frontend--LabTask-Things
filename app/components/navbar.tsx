import Link from "next/link";

export default function Navbar(){
    return(
        <>
        <html>
        <Link href="/">Home</Link>
        <br></br>
        <Link href="/SignIn/">SignIn</Link>
        <br></br>
        <Link href="/SignUp/">SignUp</Link>
        </html>
        </>
    );
}
