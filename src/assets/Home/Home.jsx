import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaCity } from 'react-icons/fa';
import { FaMagnifyingGlassLocation } from 'react-icons/fa6';
import { IoCarSport, IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { AiOutlineShop } from 'react-icons/ai';
import { SiThemodelsresource } from 'react-icons/si';
import { IoMdSettings } from 'react-icons/io';
const { Header, Sider, Content } = Layout;
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
        navigate('/login')
    }
}, [])
  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed} style={{width:"100vh"}}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
                key: '0',
                label: (<><h1>Akobir panel</h1></>)
            },
            {
              key: '1',
              icon: <MdOutlineDashboardCustomize />,
              label: (<><NavLink to='/'>Dashboard</NavLink></>),
            },
            {
              key: '2',
              icon: <AiOutlineShop />,
              label: (<><NavLink to='/brand'>Brands</NavLink></>),
            },
            {
              key: '3',
              icon: <FaCity />              ,
              label: (<><NavLink to='/city'>City</NavLink></>),
            },
            {
                key: '4',
                icon: <IoCarSport />,
                label: (<><NavLink to='/cars'>Cars</NavLink></>),
              },
              {
                key: '5',
                icon: <FaMagnifyingGlassLocation />,
                label: (<><NavLink to='/location'>Location</NavLink></>),
              },
              {
                key: '6',
                icon: <SiThemodelsresource />,
                label: (<><NavLink to='/models'>Models</NavLink></>),
              },
              {
                key: '7',
                icon: <IoSettingsSharp />,
                label: (<><NavLink to='/setting'>Settings</NavLink></>),
              },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "scroll"
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;