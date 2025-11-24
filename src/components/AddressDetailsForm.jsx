import { useState } from "react";
import Button from "./Button"
import { LoaderCircle } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import Input from "./Input"
import {useAxiosPrivate} from "../auth/hooks/useAxiosPrivate" 
import { AxiosError } from "axios";
import { useAuth } from "../auth/AuthProvider";

export default function AddressDetailsForm() {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(prev => !prev)
    }

    const methods = useForm()
    const { formState: { errors }, handleSubmit, setError } = methods

    const axiosPrivate = useAxiosPrivate()
    const {setAuth, auth} = useAuth()

    const onSubmit = async (data) => {
        try{
            setLoading(true)
            const response = await axiosPrivate.patch("/users/address-details", data);
            const updatedUser = response.data
            setAuth(prev => ({...prev, user: updatedUser}))
        }catch(err){
            console.log(err)
            if(err instanceof AxiosError){
                switch(err.response.status){
                    case 403: 
                        setError("root", {message: "Your authorization data has expired. Please relogin."})
                        break;
                    case 400:
                        setError("root", {message: "The details you provided are invalid."})
                        break;
                    default:
                        setError("root", {message: "Something went wrong. Try again later."})
                        break;
                }
            }else{
                setError("root", {message: "Something went wrong. Try again later."})
            }
        }finally{
            setLoading(false)
        }
    }

    return <FormProvider {...methods}>
        <form 
            className="w-full py-8"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-left text-lg font-medium text-black mb-4">
                Address details
            </h2>
            <div className="w-full flex items-center gap-2 mb-4">
                <Button onClick={toggleVisibility}>
                    {
                        visible
                            ? "Hide"
                            : "Show"
                    }
                </Button>
                {
                    visible && <Button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? <>
                                    Saving...
                                    <LoaderCircle className="w-6 h-6 text-white animate-spin" />
                                </>
                                : "Save"
                        }
                    </Button>
                }
            </div>
            {
                visible && <div
                    className="w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {
                        errors.root && <h1 className="text-xl text-red-600 font-medium text-center">
                            {errors.root.message}
                        </h1>
                    }
                    <Input
                        name="emailAddress"
                        id="emailAddress"
                        type="email"
                        label="Email Address"
                        className="mb-2"
                        defaultValue={auth.user.addressDetails.emailAddress ?? ""}
                    />
                    <Input
                        name="phoneNumber"
                        id="phoneNumber"
                        label="Phone Number"
                        className="mb-2"
                        defaultValue={auth.user.addressDetails.phoneNumber ?? ""}

                    />
                    <div className="flex items-center gap-2">
                        <Input
                            name="name"
                            id="name"
                            label="Name"
                            defaultValue={auth.user.addressDetails.name ?? ""}
                        />
                        <Input
                            name="surname"
                            id="surname"
                            label="Surname"
                            defaultValue={auth.user.addressDetails.surname ?? ""}
                        />
                    </div>
                    <Input
                        name="country"
                        id="country"
                        label="Country"
                        className="mb-2"
                        defaultValue={auth.user.addressDetails.country ?? ""}
                    />
                    <Input
                        name="state"
                        id="state"
                        label="State"
                        className="mb-2"
                        defaultValue={auth.user.addressDetails.state ?? ""}
                    />
                    <Input
                        name="city"
                        id="city"
                        label="City"
                        className="mb-2"
                        defaultValue={auth.user.addressDetails.city ?? ""}
                    />
                    <Input
                        name="zipCode"
                        id="zipCode"
                        label="Zip Code"
                        className="mb-2"
                        defaultValue={auth.user.addressDetails.zipCode ?? ""}
                    />
                    <Input
                        name="street"
                        id="street"
                        label="Street name"
                        className="mb-2"
                        defaultValue={auth.user.addressDetails.street ?? ""}
                    />
                    <div className="flex items-center gap-2">
                        <Input
                            name="houseNumber"
                            id="houseNumber"
                            label="House number"
                            defaultValue={auth.user.addressDetails.houseNumber ?? ""}
                        />
                        <Input
                            name="roomNumber"
                            id="roomNumber"
                            label="Room number"
                            defaultValue={auth.user.addressDetails.roomNumber ?? ""}
                        />
                    </div>
                </div>
            }
        </form>
    </FormProvider>
}