import Modal from '../Modal';

export default function WinningModal() {
  return (
    <Modal>
      <h2 className="text-2xl mb-2">You Won!</h2>
      <button onClick={() => window.location.reload()} className="button">
        Restart The Game
      </button>
    </Modal>
  );
}
