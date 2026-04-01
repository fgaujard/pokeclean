import { useState } from "react";

import { useDebouncedValue } from "@hooks";
import { Grade, type Task, TaskType } from "@models";
import {
  getGradeColor,
  getGradeReward,
  getRoomLabel,
  getTaskTypeColor,
  getTaskTypeLabel,
} from "@utils/taskUtils";

import { Plus, Search, SlidersHorizontal } from "lucide-react";

import InfiniteScrollContainer from "@/app/components/molecules/infinite-scroll-container/InfiniteScrollContainer";
import Modal from "@/app/components/molecules/modal/Modal";
import { useTasks } from "@/tools/hooks/queries";

import "./Tasks.scss";

const TASK_TYPES = [
  TaskType.UNPLANNED,
  TaskType.PLANNED,
  TaskType.ASKED,
  TaskType.SHOPPING,
];

const Tasks: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | undefined>();
  const [selectedType, setSelectedType] = useState<TaskType | undefined>();
  const [search, setSearch, debouncedSearch] = useDebouncedValue<string>(
    "",
    500,
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTasks({
      search: debouncedSearch || undefined,
      grade: selectedGrade,
      type: selectedType,
    });

  const activeFilterCount = [selectedGrade, selectedType].filter(
    (v) => v !== undefined,
  ).length;

  const handleResetFilters = () => {
    setSelectedGrade(undefined);
    setSelectedType(undefined);
  };

  // Flatten all pages into a single array
  const allTasks = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="tasks-page">
      {/* Barre de recherche et filtres */}
      <div className="tasks-header">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher une tâche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className={`filter-button ${activeFilterCount > 0 ? "active" : ""}`}
          onClick={() => setShowFilters(true)}
        >
          <SlidersHorizontal size={18} />
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Liste des tâches scrollable */}
      <InfiniteScrollContainer
        observerProps={{
          isLoading,
          hasNextPage,
          isFetchingNextPage,
          fetchNextPage,
        }}
      >
        {allTasks.length === 0 && !isLoading ? (
          <div className="no-tasks">
            <p>Aucune tâche trouvée</p>
          </div>
        ) : (
          allTasks.map((task: Task) => (
            <div key={task.publicId} className="task-card">
              <div
                className="task-card-grade-bar"
                style={{ backgroundColor: getGradeColor(task.grade) }}
              />
              <div className="task-card-body">
                <div className="task-card-top">
                  <span
                    className="task-grade-badge"
                    style={{
                      backgroundColor: getGradeColor(task.grade),
                    }}
                  >
                    {task.grade}
                  </span>
                  <h3 className="task-title">{task.title}</h3>
                  <span className="task-reward">
                    ₽&nbsp;{getGradeReward(task.grade)}
                  </span>
                </div>
                <div className="task-card-meta">
                  <span
                    className="task-type-badge"
                    style={{ backgroundColor: getTaskTypeColor(task.type) }}
                  >
                    {getTaskTypeLabel(task.type)}
                  </span>
                  {task.room && (
                    <span className="task-room-badge">
                      {getRoomLabel(task.room)}
                    </span>
                  )}
                </div>
                {task.content && <p className="task-content">{task.content}</p>}
              </div>
            </div>
          ))
        )}
      </InfiniteScrollContainer>

      {/* Modal de filtres */}
      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)}>
        <div className="filter-modal">
          <h2 className="filter-modal-title">Filtres</h2>

          <section className="filter-section">
            <h3 className="filter-section-label">Grade</h3>
            <div className="filter-options">
              {Object.values(Grade).map((g) => (
                <button
                  key={g}
                  className={`filter-chip ${
                    selectedGrade === g ? "selected" : ""
                  }`}
                  style={
                    {
                      "--chip-color": getGradeColor(g),
                    } as React.CSSProperties
                  }
                  onClick={() =>
                    setSelectedGrade(selectedGrade === g ? undefined : g)
                  }
                >
                  {g}
                </button>
              ))}
            </div>
          </section>

          <section className="filter-section">
            <h3 className="filter-section-label">Type</h3>
            <div className="filter-options">
              {TASK_TYPES.map((t) => (
                <button
                  key={t}
                  className={`filter-chip ${
                    selectedType === t ? "selected" : ""
                  }`}
                  style={
                    {
                      "--chip-color": getTaskTypeColor(t),
                    } as React.CSSProperties
                  }
                  onClick={() =>
                    setSelectedType(selectedType === t ? undefined : t)
                  }
                >
                  {getTaskTypeLabel(t)}
                </button>
              ))}
            </div>
          </section>

          <div className="filter-actions">
            <button
              className="filter-reset"
              onClick={() => {
                handleResetFilters();
                setShowFilters(false);
              }}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </Modal>

      {/* Bouton flottant pour créer une tâche */}
      <button
        className="floating-button"
        onClick={() => console.log("Créer une nouvelle tâche")}
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

export default Tasks;
