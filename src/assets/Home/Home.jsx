// import { Button, Form, Input, message, Modal, Table } from 'antd'

// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// export default function Home() {
//     const [cities,setCities] = useState([]);
//     const [open,setOpen] = useState(false);
//     const [image, setImage] = useState(null)
//     const getCities = ()=>{
//         axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
//         .then(res=>setCities(res.data.data))
//         .catch(err=>console.log(err))
//     }
//     useEffect(()=>{
//         getCities()
//     },[])

//     const showModal = () =>{
//         setOpen(true)
//     }
//     const closeModal = () =>{
//         setOpen(false)
//     }
//     const columns = [
//         {
//             title:"Name",
//             dataIndex: 'name'
//         },
//         {
//             title:"Text",
//             dataIndex: 'text'
//         },
//         {
//             title: "Images",
//             dataIndex: 'images'
//         },
//         {
//             title:"Action",
//             dataIndex: 'car'
//         }
//     ]
//     const Akobir = cities.map((city,index)=>(
//         {
//            key:index,
//            number:index+1,
//            name:city.name,
//            text:city.text,
//            images:(<img width={150} src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${city.image_src}`} />),
//            car:(<><Button type='primary'  primary>Edit</Button><Button type='primary'  danger>Delete</Button></>)
//         }
//     ))
//        const handleSubmit = (values) =>{
//         const formData = new FormData();
//         formData.append('name', values.name);
//         formData.append('text', values.text);
//         formData.append('images', image);
       
//        axios({
//         url:'https://autoapi.dezinfeksiyatashkent.uz/api/',
//         method: 'POST',
//         headers:{
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//         },
//         data: formData
//        }).then(res=>{
//          if(res.data.success){
//             message.success("Qushildi")
//             setOpen(false)
//             getCities()
//          }
//        }).catch(err=>console.log(err));
//     }
//   return (
//     <div>
//         <Button type='primary' onClick={showModal}>Add</Button>
//       <Table columns={columns} dataSource={Akobir}/>
//       <Modal title='CITY qoshish' open={open} footer={null} onCancel={closeModal}>
//           <Form
//           labelCol={{
//             span: 3,
//           }}
//           wrapperCol={{
//             span: 20,
//           }}
//           style={{
//             maxWidth: 700,
//           }}
//           onFinish={handleSubmit}
//           >
//             <Form.Item label= "Name" name="name" >
//                 <Input placeholder='name'/>
//             </Form.Item>
//             <Form.Item label= "Text" name="text">
//                 <Input placeholder='text'/>
//             </Form.Item >
//             <Form.Item label= "Image"name="images" >
//                 <Input type='file' onChange={(e)=>setImage(e.target.files[0])}/>
//             </Form.Item>
        
//               <Form.Item 
//              wrapperCol={{
//              offset: 8,
//              span: 16,
//               }}
//            >
//                 <Button type="primary" htmlType="submit">
//                      Submit
//                 </Button>
//              </Form.Item>
//           </Form>
//       </Modal>
//     </div>
//   )
// }


import { Button, Form, Input, message, Modal, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [cities, setCities] = useState([]);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);

    const getCities = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
            .then(res => setCities(res.data.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getCities();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: 'name'
        },
        {
            title: "Text",
            dataIndex: 'text'
        },
        {
            title: "Images",
            dataIndex: 'images',
            render: (_, record) => (
                <img
                    width={150}
                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${record.images}`}
                    alt={record.name}
                />
            )
        },
        {
            title: "Action",
            key: 'action',
            render: () => (
                <>
                    <Button type="primary">Edit</Button>
                    <Button type="primary" danger>Delete</Button>
                </>
            )
        }
    ];

    const dataSource = cities.map((city, index) => ({
        key: index,
        name: city.name,
        text: city.text,
        images: city.image_src,  // Assuming 'images' is the correct key in the data structure
    }));

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('text', values.text);
        formData.append('images', image);

        axios({
            url: 'https://autoapi.dezinfeksiyatashkent.uz/api/cities',  // Updated with the correct endpoint
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: formData
        })
        .then(res => {
            if (res.data.success) {
                message.success("City added successfully");
                setOpen(false);
                getCities();
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <Button type='primary' onClick={showModal}>Add</Button>
            <Table columns={columns} dataSource={dataSource} />
            <Modal title='Add City' open={open} onCancel={closeModal} footer={null}>
                <Form
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 700 }}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Name" name="name" >
                        <Input placeholder='name' />
                    </Form.Item>
                    <Form.Item label="Text" name="text">
                        <Input placeholder='text' />
                    </Form.Item>
                    <Form.Item label="Image" name="images">
                        <Input type='file' onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
