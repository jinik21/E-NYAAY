import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "case 1",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "case 2",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "case 3",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "case 4",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "case 5",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "case 6",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
  },
];

const Feeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Incoming Cases</CardTitle>
        {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
          Widget you can use
        </CardSubtitle> */}
        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/dashboard/about"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
