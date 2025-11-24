import AddressDetailsForm from "../components/AddressDetailsForm"

export default function SettingsPage(){
    return <div className="w-full max-w-2xl py-8 px-4 mx-auto">
        <h1 className="text-center text-2xl font-semibold text-black">
            User settings
        </h1>
        <AddressDetailsForm />
    </div>
}
