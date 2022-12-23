import UserPanel from "../components/Layout/Default/UserPanel";

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

const Breadcrumb = ({}) => {
  return (
    <>
      <h1 className="back-heading">{" Error "}</h1>
      <div className="status-date"></div>
    </>
  );
};

const panel = ({}) => {
  return <UserPanel Breadcrumb={Breadcrumb}></UserPanel>;
};
Error.Breadcrumb = panel;

export default Error;
