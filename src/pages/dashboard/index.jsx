import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setPages,
  setCurrentPage,
  setRouteLocation,
  setCurrentNote,
  setPinnedPage,
} from "../../redux/store";
import { useRef, useState } from "react";

const colorToImageDeleteMap = {
  "#8a4a41": "../../../assets/deletered.png",
  "#444d92": "../../../assets/deleteblue.png",
  "#3b5c46": "../../../assets/deletegreen.png",
  "#262326": "../../../assets/delete.png",
};
const colorToImageBookMarkMap = {
  "#8a4a41": "../../../assets/bookmarkred.png",
  "#444d92": "../../../assets/bookmarkblue.png",
  "#3b5c46": "../../../assets/bookmarkgreen.png",
  "#262326": "../../../assets/bookmark.png",
};
const colorToImageBookMarkFullMap = {
  "#8a4a41": "../../../assets/bookmarkfullred.png",
  "#444d92": "../../../assets/bookmarkfullblue.png",
  "#3b5c46": "../../../assets/bookmarkfullgreen.png",
  "#262326": "../../../assets/bookmarkfull.png",
};

export default function Dashboard() {
  const circleExpandRef = useRef();
  const dashboardRef = useRef();
  const pageTitleRef = useRef();
  const pages = useSelector((state) => state.pages);
  const currentPage = useSelector((state) => state.currentPage);
  const pinnedPage = useSelector((state) => state.pinnedPage);
  const dispatch = useDispatch();
  const [editPageName, setEditPageName] = useState(false);

  function handleAddition(page_id, id) {
    const newNote = {
      title: "Note title",
      tagline: "Note's tagline, add you tagline here",
      body: "note's body, add your content here",
      id: "n-" + id,
      page_id: page_id,
      color: "#262326",
      lastUpdated: new Date().toLocaleString(),
      originalPost: new Date().toLocaleString(),
      pinned: false,
    };

    // Create a copy of the current page and add the new note
    const updatedPage = {
      ...currentPage,
      notes: [...currentPage.notes, newNote],
    };

    // Find the index of the current page in the pages array
    const pageIndex = pages.findIndex(
      (page) => page.page_id === currentPage.page_id
    );

    // Create a copy of the pages array with the updated page
    const updatedPages = [...pages];
    updatedPages[pageIndex] = updatedPage;

    // Update the Redux store with the updated pages and current page
    dispatch(setPages(updatedPages));
    dispatch(setCurrentPage(updatedPage));
  }

  function deletePage(pageToDelete) {
    if (pages.length === 1) {
      // If there's only one page left, don't allow deletion
      return;
    }

    // Find the index of the current page in the pages array
    const pageIndex = pages.findIndex(
      (page) => page.page_id === currentPage.page_id
    );

    if (pageIndex !== -1) {
      // Create a copy of the pages array without the deleted page
      const updatedPages = pages.filter(
        (page) => page.page_id !== pageToDelete.page_id
      );

      // Determine the new current page
      let updatedCurrentPage = currentPage;

      if (updatedPages.length > 0) {
        // If the deleted page was the last page, set the new current page to the previous page
        if (pageIndex === updatedPages.length) {
          updatedCurrentPage = updatedPages[pageIndex - 1];
        }
        // If the deleted page was not the last page, set the new current page to the same page
        else {
          updatedCurrentPage = updatedPages[pageIndex];
        }
      }

      // Update the Redux store with the updated pages and current page
      dispatch(setPages(updatedPages));
      setTimeout(() => dispatch(setCurrentPage(updatedCurrentPage)), 1);
    }
  }

  function deleteNote(noteToDelete) {
    // Find the index of the current page in the pages array
    console.log("note to delete page id: " + noteToDelete.page_id);
    const pageIndex = pages.findIndex(
      (page) => page.page_id === noteToDelete.page_id
    );
    console.log("page index: " + pageIndex);

    if (pageIndex !== -1) {
      // Create a copy of the current page with the note removed
      const updatedNotes = currentPage.notes.filter(
        (note) => note.id !== noteToDelete.id
      );

      const updatedPage = { ...currentPage, notes: updatedNotes };

      const updatedPinnedNotes = pinnedPage.notes.filter(note=> note.id !== noteToDelete.id);
      const updatedPages = [...pages];
      updatedPages[pageIndex] = { ...pages[pageIndex], notes: updatedNotes };

      // Update the Redux store with the updated pages and current page and pinned page
      dispatch(setPages(updatedPages));
      dispatch(setCurrentPage(updatedPage));
      dispatch(setPinnedPage({...pinnedPage, notes: updatedPinnedNotes}));
    }
  }

  function handlePageAddition(name = "Page-1", id) {
    const newPage = {
      name: name,
      notes: [],
      page_id: id,
    };

    dispatch(setPages([...pages, newPage]));
  }

  function handlePageRoute(page) {
    dispatch(setCurrentPage(page));
  }
  function handleNoteClick(note, i) {
    dashboardRef.current.style.overflow = "hidden";
    const circle = circleExpandRef.current;
    const event = document.getElementById(i);
    event.style.opacity = "1";
    console.log(event);
    event.style.zIndex = 105;
    circle.style.zIndex = 104;

    if (window.innerWidth < 576) {
      circle.style.animation =
        "circleExpand-animate-mobile 1s cubic-bezier(.57,.21,.69,1.25) 0s 1 forwards";
    } else {
      circle.style.animation =
        "circleExpand-animate 1s cubic-bezier(.57,.21,.69,1.25) 0s 1 forwards";
    }

    event.style.animation = "fadeAway 0.4s linear 1s 1 forwards";

    dispatch(setCurrentNote(note));
    setTimeout(() => {
      dispatch(setRouteLocation(2));
    }, 1500);
  }

  function handleMouseEnter(event, n) {
    const note = event.currentTarget;
    note.style.borderLeftColor = n.color;
  }
  function handleMouseLeave(event) {
    const note = event.currentTarget;
    note.style.borderLeftColor = "#e8e4d5";
  }
  function handleTouchStart(event, n) {
    const note = event.currentTarget;
    note.style.borderLeftColor = n.color;
  }

  function handleTouchEnd(event) {
    const note = event.currentTarget;
    note.style.borderLeftColor = "#e8e4d5";
  }
  function handlePageNameEdit() {
    if (editPageName) {
      const newPageName = pageTitleRef.current.value;
      if (newPageName !== currentPage.name) {
        const updatedPages = pages.map((page) =>
          page.page_id === currentPage.page_id
            ? { ...page, name: newPageName }
            : page
        );

        const updatedCurrentPage = { ...currentPage, name: newPageName };

        dispatch(setPages(updatedPages));
        dispatch(setCurrentPage(updatedCurrentPage));
      }
    }
    setEditPageName(!editPageName);
  }
  function addPinnedNote(note) {
    const updatedNote = {
      ...note,
      pinned: true,
    };

    // Create a copy of the current page with the updated note
    const updatedNotes = currentPage.notes.map((n) =>
      n.id === note.id ? updatedNote : n
    );
    const updatedPage = { ...currentPage, notes: updatedNotes };

    // Create a copy of the pages array with the updated page
    const updatedPages = pages.map((page) =>
      page.page_id === currentPage.page_id ? updatedPage : page
    );

    // Create a copy of the pinnedPage with the updated notes
    const updatedPinnedNotes = [...pinnedPage.notes, updatedNote];
    const updatedPinnedPage = {
      ...pinnedPage,
      notes: updatedPinnedNotes,
    };

    dispatch(setPinnedPage(updatedPinnedPage));
    dispatch(setPages(updatedPages));
    dispatch(setCurrentPage(updatedPage));
  }

  function removePinnedNote(noteToRemove) {
    // Create an updated note with the pinned property set to false
    const updatedNote = {
      ...noteToRemove,
      pinned: false,
    };

    // Update the pinnedPage by filtering out the note to be unpinned
    const updatedPinnedNotes = pinnedPage.notes.filter(
      (pinnedNote) => pinnedNote.id !== noteToRemove.id
    );
    const updatedPinnedPage = {
      ...pinnedPage,
      notes: updatedPinnedNotes,
    };

    dispatch(setPinnedPage(updatedPinnedPage));

    // Update the pinned status of the note in all pages' notes arrays
    const updatedPages = pages.map((page) => ({
      ...page,
      notes: page.notes.map((n) =>
        n.id === noteToRemove.id ? updatedNote : n
      ),
    }));

    // Update the Redux store with the updated pages
    dispatch(setPages(updatedPages));

    // Update the current page if needed
    const updatedCurrentPage = {
      ...currentPage,
      notes: currentPage.notes.map((n) =>
        n.id === noteToRemove.id ? updatedNote : n
      ),
    };

    dispatch(setCurrentPage(updatedCurrentPage));
    if (currentPage.page_id === pinnedPage.page_id) {
      const updatedCurrentPage = { ...currentPage, notes: updatedPinnedNotes };
      dispatch(setCurrentPage(updatedCurrentPage));
    }
  }

  return (
    <>
      <div className="dashboard-container" ref={dashboardRef}>
        <div className="neo-notes-logo d-flex align-items-center">
          {editPageName ? (
            <>
              <div className="me-auto page-name position-relative">
                <input
                  ref={pageTitleRef}
                  className="note-title-edit-input page-title-edit-input"
                  placeholder={currentPage.name}
                ></input>
                <span>
                  <img
                    onClick={handlePageNameEdit}
                    className="edit-btn"
                    src={"../../../assets/save.png"}
                  ></img>
                </span>
              </div>
            </>
          ) : (
            <div className="me-auto page-name position-relative pe-5">
              <div
                style={{
                  border: "3px solid #e8e4d500",
                }}
              >
                {currentPage.name}
              </div>
              <img
                onClick={() => setEditPageName(true)}
                className="page-edit-btn"
                src={"../../../assets/edit.png"}
              ></img>
            </div>
          )}

          <img
            src={"../../../assets/neonoteslogo.png"}
            className="neo-notes-logo-img"
            onClick={()=> dispatch(setRouteLocation(0))}
          ></img>
        </div>
        <div className="notes-section">
          <div className="expand-note-circle" ref={circleExpandRef}></div>
          <div className="row m-0 p-0">
            {currentPage.notes.map((note, i) => (
              <div
                className="note mt-2 mb-2 col-lg-4 col-sm-6 col-12"
                key={"notekey-" + i}
                id={note.id}
                style={{
                  color: note.color,
                }}
                onMouseEnter={(e) => handleMouseEnter(e, note)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={(e) => handleTouchStart(e, note)}
                onTouchEnd={handleTouchEnd}
                onClick={() => handleNoteClick(note, note.id)}
              >
                <div>
                  <h1
                    className="note-title position-relative"
                    
                  >
                    {note.title.slice(0, 35)}
                    {note.title.length > 20 && "..."}
                    <div
                      className="note-delete-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteNote(note);
                      }}
                    >
                      <img
                        src={colorToImageDeleteMap[note.color]}
                        className="note-delete-btn-img"
                      ></img>
                    </div>
                    <div
                      className="note-pin-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (note.pinned) {
                          removePinnedNote(note);
                        } else {
                          addPinnedNote(note);
                        }
                      }}
                    >
                      <img
                        src={
                          note.pinned
                            ? colorToImageBookMarkFullMap[note.color]
                            : colorToImageBookMarkMap[note.color]
                        }
                        className="note-pin-btn-img"
                      />
                    </div>
                  </h1>
                  
                  <p className="note-tagline">{note.tagline.slice(0, 40)}</p>
                  <p className="note-body">{note.body.slice(0, 200)}</p>
                </div>
              </div>
            ))}

            {pinnedPage.page_id == currentPage.page_id ? (
              <></>
            ) : (
              currentPage.notes.length < 6 && (
                <div
                  className={
                    "add-note d-flex justify-content-center align-items-center col-lg-4 col-sm-6 col-12"
                  }
                  onClick={() => {
                    handleAddition(
                      currentPage.page_id,
                      currentPage.notes.length + 1
                    );
                  }}
                >
                  <div className="add-symbol noselect-d">+</div>
                </div>
              )
            )}

            {pinnedPage.page_id == currentPage.page_id ? (
              <></>
            ) : (
              currentPage.notes.length >= 6 && (
                <div className="warning">
                  Max Limit Reached, create new page to add more notes (top
                  right/bottom)
                </div>
              )
            )}
          </div>
        </div>

        <div className="page-menu">
          <div
            key={"page" + 0}
            className={
              "page-number pin-img " +
              (pinnedPage.page_id == currentPage.page_id ? "page-active" : "")
            }
            
            id={pinnedPage.page_id}
            onClick={() => handlePageRoute(pinnedPage)}
          >
            <img
              style={{ width: "15px" }}
              src={pinnedPage.page_id==currentPage.page_id ? '../../../assets/pin.png' : '../../../assets/pinlight.png'}
            ></img>
          </div>
          {pages.map((page, i) => (
            <div
              key={"page" + i}
              className={
                "page-add-btn page-number " +
                (page.page_id == currentPage.page_id ? "page-active" : "")
              }
              id={page.page_id}
              onClick={() => handlePageRoute(page)}
              onTouchStart={() => handlePageRoute(page)}
            >
              {page.page_id}
              {pages.length <= 1 ? (
                ""
              ) : (
                <span
                  className="badge page-menu-badge"
                  onClick={() => deletePage(page)}
                >
                  -
                </span>
              )}
            </div>
          ))}
          <div
            className="page-add-btn noselect-d"
            onClick={() =>
              handlePageAddition(
                "Page Name-" + (pages[pages.length - 1].page_id + 1),
                pages[pages.length - 1].page_id + 1
              )
            }
          >
            +
          </div>
        </div>
      </div>
    </>
  );
}
