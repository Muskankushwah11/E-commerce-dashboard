import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const handleAddProduct = async () => {
        // Check if any field is empty
        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }

        const user = localStorage.getItem('user');
        if (!user) {
            console.error("User not found in localStorage");
            return;
        }

        const userId = JSON.parse(user)._id;

        try {
            let result = await fetch("http://localhost:5000/add-product", {
                method: 'POST',
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            result = await result.json();
            console.warn(result);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="product">
            <h1>Add Product</h1>
            
            <input 
                type="text" 
                placeholder="Enter Product Name" 
                className="inputBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="invalid-input">Enter valid name</span>}
            
            <input 
                type="text" 
                placeholder="Enter Product Price" 
                className="inputBox"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="invalid-input">Enter valid price</span>}
            
            <input 
                type="text" 
                placeholder="Enter Product Category" 
                className="inputBox"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span className="invalid-input">Enter valid category</span>}
            
            <input 
                type="text" 
                placeholder="Enter Product Company" 
                className="inputBox"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span className="invalid-input">Enter valid company</span>}
            
            <button onClick={handleAddProduct} className="appButton">
                Add Product
            </button>
        </div>
    );
};

export default AddProduct;
