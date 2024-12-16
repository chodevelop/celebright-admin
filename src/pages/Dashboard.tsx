import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin, message, Tabs } from 'antd';
import {
  UserOutlined,
  ProfileOutlined,
  TeamOutlined,
  CrownOutlined,
  EditOutlined,
} from '@ant-design/icons';
import axiosInstance from '../api/client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const { TabPane } = Tabs;
const COLORS = ['#0088FE', '#00C49F'];

// StatisticCard 컴포넌트
const StatisticCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  style: React.CSSProperties;
}> = ({ title, value, icon, style }) => (
  <Card style={style}>
    <Statistic title={title} value={value} prefix={icon} />
  </Card>
);

// ChartCard 컴포넌트
const ChartCard: React.FC<{
  title: string;
  data: any[];
  dataKey: string;
  lineColor: string;
}> = ({ title, data, dataKey, lineColor }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey={dataKey} stroke={lineColor} activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

// PieChartCard 컴포넌트
const PieChartCard: React.FC<{
  data: any[];
  title: string;
}> = ({ data, title }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={110}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/admin');
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        message.error('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Spin
        style={{ display: 'block', marginTop: '50px', textAlign: 'center' }}
      />
    );
  }

  const pieData = [
    { name: 'Influencers', value: stats?.influencerCount || 0 },
    { name: 'Users', value: (stats?.totalUserCount || 0) - (stats?.influencerCount || 0) },
  ];

  const membershipPieData = [
    { name: 'Users', value: stats?.totalUserCount || 0 },
    { name: 'Memberships', value: stats?.totalMembershipCount || 0 },
  ];

  return (
    <>
      <Card
        title="Dashboard"
        bordered={false}
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          minHeight: '80vh',
        }}
      >
        <Row gutter={[16, 6]}>
          {/* Statistic Cards */}
          {[
            {
              title: '오늘 가입한 사용자',
              value: stats?.todayUserCount || 0,
              icon: <UserOutlined style={{ color: '#1890ff' }} />,
              style: { backgroundColor: '#e6f7ff', borderColor: '#91d5ff' },
            },
            {
              title: '전체 사용자 수',
              value: stats?.totalUserCount || 0,
              icon: <TeamOutlined style={{ color: '#52c41a' }} />,
              style: { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' },
            },
            {
              title: '전체 피드 수',
              value: stats?.feedCount || 0,
              icon: <ProfileOutlined style={{ color: '#fa8c16' }} />,
              style: { backgroundColor: '#fff7e6', borderColor: '#ffd591' },
            },
            {
              title: '인플루언서 수',
              value: stats?.influencerCount || 0,
              icon: <CrownOutlined style={{ color: '#eb2f96' }} />,
              style: { backgroundColor: '#fff0f6', borderColor: '#ffadd2' },
            },
            {
              title: '오늘 작성된 피드 수',
              value: stats?.todayFeedCount || 0,
              icon: <EditOutlined style={{ color: '#2f54eb' }} />,
              style: { backgroundColor: '#f0f5ff', borderColor: '#adc6ff' },
            },
            {
              title: '총 멤버십 가입자 수',
              value: stats?.totalMembershipCount || 0,
              icon: <UserOutlined style={{ color: '#1890ff' }} />,
              style: { backgroundColor: '#e6f7ff', borderColor: '#91d5ff' },
            },
            {
              title: '인플루언서 팔로워 수',
              value: `최소: ${stats?.influencerFollowerStats.minFollowers || 0}, 최대: ${stats?.influencerFollowerStats.maxFollowers || 0}`,
              icon: <TeamOutlined style={{ color: '#52c41a' }} />,
              style: { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' },
            },
            {
              title: '인플루언서당 평균 팔로워 수',
              value: (stats?.influencerFollowerStats.avgFollowers || 0).toFixed(2),
              icon: <CrownOutlined style={{ color: '#eb2f96' }} />,
              style: { backgroundColor: '#fff0f6', borderColor: '#ffadd2' },
            },
          ].map((stat, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6}>
              <StatisticCard {...stat} />
            </Col>
          ))}
          {/* Line Charts */}
          <Col xs={24} sm={24} md={24} lg={12}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="날짜별 결제금액" key="1">
                  <ChartCard
                    title="날짜별 결제금액"
                    data={stats?.paymentAmountsByDate || []}
                    dataKey="amount"
                    lineColor="#ff7300"
                  />
                </TabPane>
                <TabPane tab="날짜별 가입자 수" key="2">
                  <ChartCard
                    title="날짜별 가입자 수"
                    data={stats?.userCountsByDate || []}
                    dataKey="count"
                    lineColor="#82ca9d"
                  />
                </TabPane>
                <TabPane tab="날짜별 피드 수" key="3">
                  <ChartCard
                    title="날짜별 피드 수"
                    data={stats?.feedCountsByDate || []}
                    dataKey="count"
                    lineColor="#8884d8"
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          {/* Pie Charts */}
          <Col xs={24} sm={24} md={24} lg={12}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="사용자 비율" key="1">
                  <PieChartCard title="사용자 비율" data={pieData} />
                </TabPane>
                <TabPane tab="멤버십 비율" key="2">
                  <PieChartCard title="멤버십 비율" data={membershipPieData} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Dashboard;
