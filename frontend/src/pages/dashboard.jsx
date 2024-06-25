import { Appbar } from "../components/appbar";
import { Balance } from "../components/balance";
import { Users } from "../components/user";


export function Dashboard() {
    return (
        <>
            <Appbar />
            <Balance   balance={20000}/>
            <Users />
        </>

    )
}