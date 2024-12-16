import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const CustomHeader: React.FC = () => (
  <Header style={{ background: '#001529', padding: '0 16px', color: '#fff', display: 'flex', alignItems: 'center' }}>
    <Title level={3} style={{ margin: 0, color: '#fff' }}>
      Welcome, Admin
    </Title>
  </Header>
);

export default CustomHeader;
