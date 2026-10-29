import '../styles/Pagination.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }: PaginationProps) => {
  return (
    <nav className="pagination" aria-label="Paginación">
      <button
        type="button"
        className="button button--glass glass"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>

      <button
        type="button"
        className="button button--glass glass"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </nav>
  )
}

export default Pagination
