import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import img1 from "../Components/data.png"
function Edit() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [disc, setDisc] = useState("")
    const params = useParams();

    useEffect(() => {
        axios.get(`/api/file/${params.id}`).then((res) => {
            setName(res.data.name);
            setPrice(res.data.price);
            setCategory(res.data.category);
            setDisc(res.data.disc);
        })
    }, [])

    const changeOnClick = (e) => {
        axios.put(`/api/file/${params.id}`, {
            name,
            price,
            category,
            disc
        }).then((res) => {
            setName(res.data.name);
            setPrice(res.data.price);
            setCategory(res.data.category);
            setDisc(res.data.disc);
        })
    }

    return (
        <div> <a href="/"><button className='btn'>Back</button></a>
        <div id='edit'>
           
            <div>  <form className='form2' onSubmit={changeOnClick}>
                <label htmlFor="">Name</label>
                <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control" />
                     <label htmlFor="">Name</label>
                <input
                    placeholder="Category"
                    value={category}
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control" />
                     <label htmlFor="">Name</label>
                <input
                    placeholder="Price"
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control" />
                     <label htmlFor="">Name</label>
                <input
                    placeholder="disc"
                    type="text"
                    value={disc}
                    onChange={(e) => setDisc(e.target.value)}
                    className="form-control" />
                <button type="submit">Update Product</button>
            </form>
</div>
<div className='section'>
   <img className='image1' src={img1} alt="" />
</div>
          
        </div></div>
    )
}

export default Edit