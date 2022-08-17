export const prodData= async()=>{
    const res=await fetch("https://fakestoreapi.com/products");
    let data =await res.json();
    return data;
}