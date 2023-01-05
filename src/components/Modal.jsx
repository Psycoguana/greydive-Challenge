import './../styles/Modal.css';

export default function Modal({ title, content, showModal, setShowModal }) {
	return (
		<>
			<div id="myModal" className={`modal ${showModal ? '' : 'hidden'}`}>
				<div className="modal-content">
					<div className="modal-header">
						<span
							className="close"
							onClick={() => {
								setShowModal(false);
							}}
						>
							&times;
						</span>
						<h2>{title}</h2>
					</div>
					<div className="modal-body">{content}</div>
					{/* <div className="modal-footer">
						<h3>Modal Footer</h3>
					</div> */}
				</div>
			</div>
		</>
	);
}
