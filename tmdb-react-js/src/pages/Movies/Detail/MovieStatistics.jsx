import { Card, Statistic } from "antd";

export default function MovieStatistics({ movie }) {
  return (
    <Card title="Statistics" style={{ marginBottom: 20 }} >
      <Statistic title="Rating" value={ movie.voteAverage } />
      <Statistic title="Votes" value={ movie.voteCount } />
      <Statistic title="Popularity" value={ movie.popularity } />
      <Statistic title="Budget" value={ movie.budget } />
      <Statistic title="Revenue" value={ movie.revenue } />
    </Card>
  );
}
