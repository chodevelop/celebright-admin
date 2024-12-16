import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter: React.FC = () => (
  <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>
    Admin Dashboard ©2024 Created by Team Dev6
  </Footer>
);

export default CustomFooter;
