import { View, Text } from "../components/Themed"
import { Link } from "expo-router"
import { Pressable, Button } from "react-native"
import AccountSettings from "./actsettings"


const ProfileSettings = () => {

    return (
        <>
            <Link href="/actsettings">

                <Button
                    title="Account Settings"
                    onPress={() => {
                    }}
                />

            </Link>

            <Link href="/privacyset">

                <Button
                    title="Privacy Settings"
                    onPress={() => {
                    }}
                />

            </Link>
            <Link href="/datetime">

                <Button
                    title="Date and Time"
                    onPress={() => {
                    }}
                />

            </Link>
        </>
    )
}


export default ProfileSettings
