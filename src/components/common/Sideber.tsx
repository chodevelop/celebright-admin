import React from 'react';
import { Layout, Menu, Image } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const { Sider } = Layout;

const menuItems = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: <Link to='/'>Dashboard</Link>,
  },
  {
    key: '2',
    icon: <UserOutlined />,
    label: <Link to='/users'>Users</Link>,
  },
  {
    key: '3',
    icon: <FileTextOutlined />,
    label: <Link to='/feed'>Feed</Link>,
  },
  {
    key: '4',
    icon: <FileTextOutlined />,
    label: <Link to='/influencer/applies'>Influencer Applies</Link>,
  },
  {
    key: '5',
    icon: <FileTextOutlined />,
    label: <Link to='/payment'>Payment</Link>,
  },
  {
    key: '6',
    icon: <SettingOutlined />,
    label: <Link to='/settings'>Settings</Link>,
  },
];

const Sidebar: React.FC = () => (
  <Sider collapsible>
    {/* <CelebrightLogo /> */}
    <Image
      src={logo}
      alt="Celebright Logo"
      preview={false}
      style={{
        width: '80%',   // 원하는 로고 너비 설정
        height: 'auto',   // 높이를 비율에 맞게 자동 설정
        display: 'block',
        margin: 'auto', // 가운데 정렬
        marginTop: '10px', // 상단 여백
        marginBottom: '10px', // 상단 여백
      }}
    />
    <Menu theme='dark' mode='inline' items={menuItems} />
  </Sider>
);
export default Sidebar;
