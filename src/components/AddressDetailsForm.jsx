import { useState } from "react";
import Button from "./Button"
import { LoaderCircle } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import Input from "./Input"

export default function AddressDetailsForm() {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(prev => !prev)
    }

    const methods = useForm()
    const { formState: { errors }, handleSubmit, setError } = methods

    const onSubmit = (data) => {
        console.log(data)
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
                    />
                    <Input
                        name="phoneNumber"
                        id="phoneNumber"
                        label="Phone Number"
                        className="mb-2"
                    />
                    <Input
                        name="country"
                        id="country"
                        label="Country"
                        className="mb-2"
                    />
                    <Input
                        name="state"
                        id="state"
                        label="State"
                        className="mb-2"
                    />
                    <Input
                        name="city"
                        id="city"
                        label="City"
                        className="mb-2"
                    />
                    <Input
                        name="street"
                        id="street"
                        label="Street name"
                        className="mb-2"
                    />
                    <div className="flex items-center gap-2">
                        <Input
                            name="houseNumber"
                            id="houseNumber"
                            label="House number"
                        />
                        <Input
                            name="roomNumber"
                            id="roomNumber"
                            label="Room number"
                        />
                    </div>
                </div>
            }
        </form>
    </FormProvider>
}