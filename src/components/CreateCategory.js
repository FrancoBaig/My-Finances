import React from "react";

// Redux
import { useDispatch } from "react-redux";
import { postCategory } from "../redux/states/categoriesState";

// useForm
import { useForm } from "react-hook-form";

// randomColor
import randomColor from "randomcolor";

function CreateCategory({ display = true, setDisplay }) {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSubmitTransaction = (form) => {
        const data = {
            title: form.title,
            category_type: parseInt(form.category_type),
            color: randomColor({
                    luminosity: "light",
                    hue: "blue",
            })
        };
        dispatch(postCategory(data));
        setDisplay(false);
    };

    return (
        <>
            {display ? (
                <div className="fixed top-0 right-0 w-full h-full flex justify-center items-center">
                    <div
                        className="backdrop"
                        onClick={() => setDisplay(false)}
                    ></div>
                    <form
                        onSubmit={handleSubmit(handleSubmitTransaction)}
                        className="paper rounded-md w-8/12 z-40 grid gap-4"
                    >
                        <div>
                            <label className="label">Create category</label>
                            <input
                                type="text"
                                placeholder="Category name"
                                className="input"
                                {...register(
                                    "title",
                                    { required: true },
                                    {
                                        valueAsNumber: true,
                                    }
                                )}
                            />
                            {errors.title && (
                                <span className="input-error">
                                    The title is required
                                </span>
                            )}
                        </div>
                        <div>
                            <select
                                className="block w-full border-b input py-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                                {...register("category_type", {
                                    required: true,
                                })}
                            >
                                <option value={1}>Income</option>
                                <option value={2}>Expense</option>
                            </select>
                            {errors.category_type && (
                                <span className="input-error">
                                    This field is required
                                </span>
                            )}
                        </div>
                        <button type="submit" className="btn">
                            Send
                        </button>
                    </form>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default CreateCategory;
