import React, {useState} from 'react';
import axios from "axios";
// import { color } from '@dicebear/avatars';
export default function Create() {

    const [state, setState] = useState({
        text: "",
        des: "",
        supply: null,
        file: null,
    });

    function handleChange(e) {
        if (e.target.files) {
            setState({ ...state, [e.target.name]: e.target.files[0] });
        } else {
            setState({ ...state, [e.target.name]: e.target.value });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();

        for (let [key, value] of Object.entries(state)) {
            formData.append(key, value);
        }

        // Use fetch or axios to submit the form
        await axios
            .post("{Formeezy-Endpoint}", formData)
            .then(({ data }) => {
                const { redirect } = data;
                // Redirect used for reCAPTCHA and/or thank you page
                window.location.href = redirect;
            })
            .catch((e) => {
                window.location.href = e.response.data.redirect;
            });
    }

    return (
        <main className="container mx-auto my-10">
             <h1 className='text-5xl font-bold mb-10'>
                    Create New Item
                </h1>
            <div className="flex flex-col items-center">
               
                <form onSubmit={handleSubmit}>
                     <label className='mb-2'>
                    <span
                        className="before:content-['*'] before:ml-0.5 before:text-red-500"
                        style={{ fontSize:12, fontWeight: 'medium' }}>
                        Require fields
                    </span>
                </label>
                <div className='flex flex-col relative mb-5'>
                    <label className='mb-2'>
                        <span
                        className="after:content-['*'] after:ml-0.5 after:text-red-500"
                        style={{ fontSize:18, fontWeight: 'bold', color:'#fff'}}>
                            Image, Video, Audio, or 3D Model
                        </span>
                        <br/>
                            <span className='text-xs font-medium'>
                            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
                        </span>
                    </label>
                        <div className="hover:bg-black"
                        style={{
                                width: 800,
                                height: 200,
                                borderRadius:10,
                                background: '#353840',
                                borderStyle:'dashed',
                                borderWidth:3,
                                borderColor: '#fff',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                position:'relative'

                            }}
                    >
                            <label for="input">
                                <img 
                                style={{
                                    width:80,
                                    position:'absolute',
                                    left:'45%',
                                    top:'25%'
                                }}
                                
                                src="https://icon-library.com/images/upload-icon-vector/upload-icon-vector-10.jpg" />
                            </label>
                            <input
                            
                            id='file' 
                            type="file" 
                            name="file" 
                                style={{
                                    width: 800,
                                    height: 200,
                                    opacity:0,
                                    zIndex:100,
                                }}
                                onChange={handleChange}
                            />
                    </div>
                    </div>
                    
                    <div className='flex flex-col'>
                        <label className='mb-2'>
                            <span 
                                className="after:content-['*'] after:ml-0.5 after:text-red-500"
                            style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                                Name
                            </span>
                        </label>
                        <input
                            name="text"
                            type="text"
                            placeholder="Item name"
                            onChange={handleChange}
                            value={state.text}
                            required
                            style={{
                                width: 800,
                                height: 40,
                                marginBottom: 20,
                                borderRadius: 5,
                                padding: 5,
                                background: '#353840',
                                outline:'none',
                                fontSize: 16,
                            }}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>
                            <span style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                                Description
                            </span>
                            <br/>
                            <span className='text-xs font-medium'>
                                The description will be included on the item's detail page underneath its image
                            </span>
                        </label>
                    <textarea
                        name="des"
                        placeholder="Provide a detailed description of your item."
                        onChange={handleChange}
                        value={state.des}
                        required
                        style={{
                            width: 800,
                            height: 200,
                            fontSize: 16,
                            borderRadius:5,
                            padding:5,
                            marginBottom: 20,
                            background: '#353840',
                            outline: 'none'
                        }}
                    />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>
                            <span style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                                Supply
                            </span>
                            <br/>
                            <span className='text-xs font-medium'>
                                The number of items that can be minted. No gas cost to you!
                                </span>
                        </label>
                    <input
                        name="Supply"
                        type="number"
                        onChange={handleChange}
                        value={state.supply}
                        style={{
                            width: 800,
                            height: 40,
                            marginBottom: 20,
                            borderRadius: 5,
                            padding: 5,
                            background: '#353840',
                            outline: 'none'
                        }}
                    />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2'>
                            <span style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                                Blockchain
                            </span>
                        </label>
                        <select
                            style={{
                                width: 800,
                                height: 40,
                                marginBottom: 20,
                                borderRadius: 5,
                                padding: 5,
                                background: '#353840',
                                outline:'none'
                            }}
                        >
                            <option value={'Ethereum'}>Ethereum</option>
                            <option value={'Polygon'}>Polygon</option>
                        </select>
                    </div>
                    <button className="btn btn-info font-bold " type="submit" >Create</button>
                </form>
            </div>
        </main>
    )
}