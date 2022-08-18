export const prodData= async()=>{
    const res=await fetch("https://fakestoreapi.com/products");
    let data =await res.json();
    return data;
}

export const prodCategory=async()=>{
    const res=await fetch("https://fakestoreapi.com/products/categories");
    let data=await res.json();
    return data;
}

export const prodId=async(id)=>{
    const res=await fetch(`https://fakestoreapi.com/products/${id}`);
    let data=await res.json();
    return data;
}