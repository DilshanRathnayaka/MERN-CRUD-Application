import React, { useEffect, useState } from 'react'
import axios from "axios";


function Home() {

    const [list, setList] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [disc, setDisc] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("")
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
        axios.get("/api/file").then((res) => {
            setList(res.data);
        })
    }, [])

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    }

    const changeOnClick = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("disc", disc);
        formData.append("fileimage", image);

        setName("");
        setPrice("");
        setDisc("");
        setCategory("")

        axios.post("/api/file", formData).then((res) => {
            console.log(res)
            setList([...list, {
                name,
                price,
                disc,
                category,

            }])
        }).catch((err) => {
            console.log(err);
        })
    }

    const Delete = (id) => {
        axios.delete(`http://localhost:5000/api/file/${id}`).then((response) => {
            window.location.reload();
        })
    }


    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== "") {
            const filteredData = list.filter((items) => {
                return Object.values(items.name)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            console.log(filteredData);
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(list);
        }
    };

    const filtercat = (catitem) => {
        const result = list.filter((list) => {
            return list.category === catitem;
        });
        setList(result)
    }



    return (
        <div className='Home'>
            <div>
                <div className='list'>
                    {searchInput.length > 1 ? filteredResults.map((items) => {
                        return (
                            <div>
                                <img src={`uploads/${items.image}`} className="image" alt='' />
                                <div>  Item Name : {items.name}</div>
                                <div> category: {items.category}</div>
                                <div>  Price: {items.price}</div>
                                <div>  Discription: {items.disc}</div>
                            </div>
                        )
                    }) :
                      list.map((item) => {
                            return (
                                <div>
                                    <img src={`uploads/${item.image}`} className="image" alt=''/>

                                    <div>  Item Name : {item.name}</div>
                                    <div> category: {item.category}</div>
                                    <div>  Price: {item.price}</div>
                                    <div>  Discription: {item.disc}</div>
                                    <div className='dlete'>
                                        <div>   <button onClick={() => Delete(item._id)}>Delete</button></div>
                                        <div className='updatee'>   <a className='update' href={`/update/${item._id}`}>Update</a></div>
                                    </div>

                                </div>
                            )
                        })}
                </div>
            </div>
            <div className='form'>
                <input className='search' type="search" placeholder='Search' onChange={(e) => searchItems(e.target.value)} name="searchitem" />
                <div className='category'>
                    <div> <button onClick={() => filtercat('men')}>Men</button></div>
                    <div><button onClick={() => filtercat('women')}>WoMen</button></div>
                    <div><button onClick={() => filtercat('bag')}>Bag</button></div>
                </div>
                <form className='form' method='POST' encType='multipart/form-data' onSubmit={changeOnClick}>
                    <input
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control" />
                    <input
                        placeholder="Category"
                        value={category}
                        type="text"
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-control" />
                    <input
                        placeholder="Price"
                        value={price}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control" />
                    <input
                        placeholder="disc"
                        type="text"
                        value={disc}
                        onChange={(e) => setDisc(e.target.value)}
                        className="form-control" />
                    <input type="file"
                        filename="fileimage"
                        className="form-control-file"
                        onChange={onChangeImage}
                    />
                    <button className='button' type="submit">Add Product</button>
                </form>
                

            </div>


        </div>

    )
}

export default Home