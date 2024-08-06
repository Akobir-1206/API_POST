import { Button, Form, Input, message, Modal, Popconfirm, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function City() {
    const [cities, setCities] = useState([]);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [currentCity, setCurrentCity] = useState(null)
    const getCities = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
            .then(res => setCities(res.data.data))
            .catch(err => console.log(err))
    }
    

    const showModal = (item) => {
        setOpen(true)
        setCurrentCity(item)
    }
    const closeModal = () => {
        setOpen(false)
    }
    useEffect(()=>{
        getCities()
    },[])
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
            dataIndex: 'images'
        },
        {
            title: "Action",
            dataIndex: 'car'
        }
    ]
    const Akobir = cities.map((city, index) => (
        {
            key: index,
            number: index + 1,
            name: city.name,
            text: city.text,
            images: (<img width={150} src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${city.image_src}`} />),
            car: (<>
                <Button type='primary' primary onClick={()=>showModal(city)}>Edit</Button>
                <Popconfirm
                    placement="topLeft"
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deleteCities(city.id)}
                >
                    <Button danger type='primary'>Delete</Button>
                </Popconfirm>
            </>)
        }
    ))
    const deleteCities = (id) => {
        setLoading(true)
        axios({
            url: `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            message.success("Ochirildi")
            getCities()

        }).catch(err => {
            message.error("Xato")

        })
            .finally(() => {
                setLoading(false)
            })
    }
    const handleSubmit = (values) => {
        setLoading2(true)
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('text', values.text);
        formData.append('images', image);
        axios({
            url: currentCity?`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${currentCity.id}`:`https://autoapi.dezinfeksiyatashkent.uz/api/cities`,
            method: currentCity?'PUT':'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: formData
        }).then(res => {
            if (res.data.success) {
                currentCity?message.success("Ozgartirildi"):message.success("Qushildi")
                setOpen(false)
                getCities()
            }
        })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading2(false)
            })
    }

    //delete button

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };



    return (
        <div>
            <Button type='primary' onClick={()=>setOpen(true)}>Add</Button>
            <Table columns={columns} dataSource={Akobir} />
            <Modal title='CITY qoshish' open={open} footer={null} onCancel={closeModal}>
                <Form
                    labelCol={{
                        span: 3,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 700,
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Name" name="name" >
                        <Input placeholder='name' />
                    </Form.Item>
                    <Form.Item label="Text" name="text">
                        <Input placeholder='text' />
                    </Form.Item >
                    <Form.Item label="Image" name="images" >
                        <Input type='file' onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

