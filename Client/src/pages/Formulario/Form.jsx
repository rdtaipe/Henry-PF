import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import './Form.css'

import { Notification } from '../../components/Notification/Notification'
import { useSelector } from 'react-redux'

import axios from 'axios';
import { Link } from "react-router-dom";
const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { url, get } = useSelector(({ state }) => state.server)

    const [module, setModule] = useState(null)

    const getModule = () => {
        get(url + `/dev/module/product`).then(res => {
          
            // console.log(res.data)
            const data = res.data.filter((e) => e["attributes"] ? e.attributes.input : null)
            const obj = {}
            data.forEach(e => {
                obj[e.key] = { ["attributes"]: e.attributes.input, ["type"]: e.type }
            })
            setModule(obj)
        })
    }

    
    useEffect(() => {
        //get se trae las validaciones de los campos por loa tanto ya es necesario utils.json
        //esto es para no tener errores de capo validaciones en el front
        getModule()
    }, [])



    /*
        ==type of dates=== 
        name: type: String,
        stock: type: Number,
        color:type: String,/[String],
        size: type: Array,
        category: type: Array,/[String],
        image: type: Array,
        genre:type: String,[String],
        brand: type: Object,[String],
        price: type: Number,[Number],
        active: type: Boolean, //true
        featured: type: Boolean  //true
    
    */


    const onSubmit = async (data) => {
        console.log(data)
        try {
            const newObj = {
                name: data.name,
                stock: data.stock,
                description: data.description,
                color: data.color,
                size: data.size,
                category: data.category,
                image: [data.image],
                genre: data.genre,
                brand: data.brand,
                price: data.price,
                active: true, //true
                featured: true  //true
            }

            console.log(newObj)
            const response = await axios.post('http://localhost:5000/products/', newObj);

            if (response.status > 200 && response.status < 300) {

                //totificacion
                Notification('success', 'product added successfully', 'top-end', 3000);
                console.log(response)
                return response.data;

                //debo resetear los campos y redirigir a home
            }

        } catch (error) {
            console.log(error.message)
        }


    }


    return (
        /*  <div className=" dark:bg-purple-900 dark:text-gray-100 min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold leading-none sm:text-6xl">Form</h2> */
       module&&<div>
            {/*        <Header/> */}
            <div className="container-form">
                <Link to='/home' className="flex items-center justify-center absolute bg-[#dadada] top-[100px] left-[300px] w-[150px] h-[70px] rounded-full hover:bg-[#000] hover:text-white hover:transform hover:scale-110 transition-all duration-500">Back To Home</Link>
                <form className=" container-card" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="title">Form Product</h2>
                    <div>
                        <input
                            className="inputStyle"
                            type="text"
                            name="name"
                            placeholder="Name of product"

                            {...register('name', {
                                required: true,
                                maxLength: 35
                            })} />
                        {errors.name?.type === 'required' && <p className="error">Name required</p>}
                        {errors.name?.type === 'maxLength' && <p className="error">Only can use 35 letters</p>}
                    </div>


                    {/*    
               
               ====no borrar======== 
               <div>
                        <input
                            className="inputStyleImage"
                            name="image"
                            id="image"
                            type="file"
                         accept=".png, .jpg ," 
                            {...register('image', {
                                required: true
                            })}
                        />
                        {errors.image?.type === 'required' && <p className="error" >Image required</p>} 

                   </div> */}


                    <div>
                        <input
                            className="inputStyleImage"
                            name="image"
                            id="image"
                            placeholder="ingrese url de imagen"
                            type="url"
                            {...register('image', {
                                required: true
                            })}
                        />
                        {errors.image?.type === 'required' && <p className="error" >url required</p>}

                    </div>




                    <div>
                        <textarea
                            className="inputStyleArea"
                            name="description"
                            placeholder="description of product"
                            rows="2" cols="25"
                            style={{ resize: 'none' }}
                            {...register('description', {
                                required: true,
                                maxLength: 400
                            })} />
                        {errors.description?.type === 'required' && <p className="error">Description required</p>}
                        {errors.description?.type === 'maxLength' && <p className="error">Only can use 400 letters</p>}
                    </div>



                    {/* container medio */}
                    <div className="container2">

                        <div>
                            <label><span className="text" >stock</span></label>
                            <input
                                className="input2"
                                type="text"
                                name="stock"
                                placeholder="0"
                                /*    min="0"
                                    step="0" */
                                /*   autocomplete="off" */
                                {...register('stock', {
                                    required: true,
                                    pattern: /^[0-9]*$/
                                })} />
                            {errors.stock?.type === 'required' && <p className="error">stock required</p>}
                            {errors.stock?.type === 'pattern' && <p className="error">Only numbers </p>}
                        </div>



                        <div>
                            <label htmlFor="price"><span className="text">Price</span></label>
                            <input
                                id="price"
                                className="input2"
                                type="text"
                                /*   min={0}
                                  step="0.01" */
                                placeholder="0.00"
                                name="price"
                                {...register('price', {
                                    required: true,
                                    pattern: /^[0-9]*$/
                                })} />

                            {errors.price?.type === 'required' && <p className="error">price required</p>}
                            {errors.price?.type === 'pattern' && <p className="error"> Only numbers </p>}

                        </div>


                        <div >
                            <select
                                className="inputSelector2"
                                id="genre"
                                name="genre"

                                {...register('genre', {
                                    required: true,
                                })}

                            >
                                <option value="">genre</option>
                                {module.genre.attributes.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            {errors.genre && <p className="error">genre required</p>}
                        </div>
                        <div>
                            <select
                                className="inputSelector2"
                                id="size"
                                name="size"

                                {...register('size', {
                                    required: true,
                                })}

                            >
                                <option value="">size</option>
                                {module.size.attributes.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            {errors.size && <p className="error">size required</p>}
                        </div>




                    </div> {/* fin contenedor medio */}

                    {/* inicio contenedor de abajo */}
                    <div className="container2">
                        <div>
                            <select
                                className="inputSelector"
                                id="color"
                                name="color"

                                {...register('color', {
                                    required: true,
                                })}

                            >
                                <option value="">Select color</option>
                                {module.color.attributes.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                            {errors.color && <p className="error">Color is required</p>}
                        </div>

                        <div>
                            <select
                                className="inputSelector2"
                                id="brand"
                                name="brand"

                                {...register('brand', {
                                    required: true,
                                })}

                            >
                                <option value="">brand</option>
                                {module.brand.attributes.map((b) => (
                                    <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                            </select>
                            {errors.brand && <p className="error">brand required</p>}
                        </div>

                        <div>
                            <select
                                className="inputSelector"
                                id="category"
                                name="category"

                                {...register('category',
                                    {
                                        required: true,
                                    })}>

                                <option value="">select category</option>
                                {
                                    module.category.attributes.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}

                            </select>
                            {errors.category && <p className="error" >Select a category</p>}
                        </div>

                    </div> {/* fin contenedor abajo */}

                    <div>
                        {/*  {!input.color || !input.gender || !input.name || !input.cotegories} */}
                        <button className="botonStyle" type="submit">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;