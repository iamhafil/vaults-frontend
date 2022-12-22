const Help = () => {
  const showAnswer = (e) => {
    let selector = e.target.closest(".help-list-item");
    selector.classList.toggle("open");
  };
  const closeModal = (e) => {
    let selector = e.target.closest(".help-modal-wrapper");
    selector.classList.remove("show-in");
  };
  return (
    <div className="help-modal-wrapper">
      <div className="help-modal">
        <span className="modal-close" onClick={closeModal}></span>
        <div className="heading">
          <div className="title">Help</div>
          <div className="description">
            Got any questions or need any inputs on how to leverage our
            platform? Find the answers here.
          </div>
        </div>
        <div className="help-list">
          <div className="help-list-item open">
            <div className="question">
              <span className="title">
                How do I list or upload my products on SAFQAT platform?
              </span>
              <span className="icon" onClick={showAnswer}></span>
            </div>
            <div className="answer">
              You can log in as a supplier on SAFQAT platform{" "}
              <a href="https://suppliers.safqat.com">
                https://suppliers.safqat.com
              </a>{" "}
              with your registered email address and password. Then go to
              "Product" on the left side of the page, and Click “Add new
              products”.
            </div>
          </div>
          <div className="help-list-item">
            <div className="question">
              <span className="title">How do I update existing products?</span>
              <span className="icon" onClick={showAnswer}></span>
            </div>
            <div className="answer">
              <p className="answer">
                Log in as a supplier on SAFQAT platform{" "}
                <a href="https://suppliers.safqat.com">
                  {" "}
                  https://suppliers.safqat.com
                </a>{" "}
                with your registered email address and password. Then go to
                "Product" on the left side of the page, and click “All
                products”.
              </p>

              <p className="answer">
                You can see the list of all your products here. Click the three
                dots on the right side of each product to edit that product.
              </p>
            </div>
          </div>
          <div className="help-list-item">
            <div className="question">
              <span className="title">Why were my products rejected?</span>
              <span className="icon" onClick={showAnswer}></span>
            </div>
            <div className="answer">
            There may be several aspects of your product information that do not comply with our product upload guidelines or country regulations.  You can make the necessary update on the products and submit them again for review. Still have issues contact us at <a href="support@safqat.com">support@safqat.com</a>
            </div>
          </div>
          {/* <div className="help-list-item">
            <div className="question">
              <span className="title">What is RFQ ?</span>
              <span className="icon" onClick={showAnswer}></span>
            </div>
            <div className="answer">
              Nulla ornare blandit fermentum. Sed consectetur leo vitae diam
              aliquet, et fringilla tellus iaculis. Fusce mattis diam velit.
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Help;
