import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function AppBreadcrumb() {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(Boolean);

  const items = [
    {
      title: <Link to="/"> Home </Link>,
    },
  ];

  pathnames.forEach((value, index) => {
    const url = "/" + pathnames.slice(0, index + 1).join("/");

    items.push({
      title:
        index === pathnames.length - 1 ? (
          value
        ) : (
          <Link to={url}>{value}</Link>
        ),
    });
  });

  return (
    <Breadcrumb
      items={items}
      style={{ marginBottom: 24 }}
    />
  );
}
