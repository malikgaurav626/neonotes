import "./edit.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import {
  setCurrentPage,
  setPages,
  setEdit,
  setRouteLocation,
  setPinnedPage,
} from "../../redux/store";

const colorToImageMap = {
  "#8a4a41": "../../../assets/neonoteslogored.png",
  "#444d92": "../../../assets/neonoteslogoblue.png",
  "#3b5c46": "../../../assets/neonoteslogogreen.png",
  "#262326": "../../../assets/neonoteslogo.png",
};
const colorToImageEditMap = {
  "#8a4a41": "../../../assets/editred.png",
  "#444d92": "../../../assets/editblue.png",
  "#3b5c46": "../../../assets/editgreen.png",
  "#262326": "../../../assets/edit.png",
};
const colorToImageSaveMap = {
  "#8a4a41": "../../../assets/savered.png",
  "#444d92": "../../../assets/saveblue.png",
  "#3b5c46": "../../../assets/savegreen.png",
  "#262326": "../../../assets/save.png",
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

export default function EditNote() {
  const titleRef = useRef();
  const taglineRef = useRef();
  const bodyRef = useRef();
  const notesRef = useRef();
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages);
  const edit = useSelector((state) => state.edit);
  const currentNote = useSelector((state) => state.currentNote);
  const pinnedPage = useSelector((state) => state.pinnedPage);
  // Find the current page based on currentNote.page_id
  const currentPage = pages.find(
    (page) => page.page_id === currentNote.page_id
  );

  // Find the index of the current note in the current page's notes array
  const currentNoteIndex = currentPage.notes.findIndex(
    (note) => note.id === currentNote.id
  );

  // Use currentNoteIndex to get the current note from the notes array
  const [currentNotee, setCurrentNotee] = useState(
    currentPage.notes[currentNoteIndex]
  );

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
    setCurrentNotee(updatedNote);
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
  
    // Update currentNotee to reflect the changes
    setCurrentNotee(updatedNote);
  }

  function setNoteTheme(event) {
    const colorId = event.target.id;

    // Create a shallow copy of the currentPage object
    const updatedPage = { ...currentPage };

    // Create a new notes array with the updated note color
    const updatedNotes = updatedPage.notes.map((note, index) => {
      if (index === currentNoteIndex) {
        let updatedNote;
        if (colorId === "dark") {
          updatedNote = { ...note, color: "#262326" };
        } else if (colorId === "red") {
          updatedNote = { ...note, color: "#8a4a41" };
        } else if (colorId === "violet") {
          updatedNote = { ...note, color: "#444d92" };
        } else if (colorId === "green") {
          updatedNote = { ...note, color: "#3b5c46" };
        } else {
          updatedNote = { ...note, color: "#262326" };
        }
        setCurrentNotee(updatedNote); // Update currentNotee
        return updatedNote;
      }
      return note;
    });

    // Update the notes array within the copied page
    updatedPage.notes = updatedNotes;

    // Dispatch actions to update the Redux store for the currentPage
    dispatch(
      setPages(
        pages.map((page) =>
          page.page_id === updatedPage.page_id ? updatedPage : page
        )
      )
    );
    dispatch(setCurrentPage(updatedPage));

    // Now, let's update the pinnedPage as well
    const updatedPinnedPage = { ...pinnedPage };
    const updatedPinnedNotes = updatedPinnedPage.notes.map((note) => {
      console.log(note.id, currentNote.id);
      if (note.id === currentNotee.id) {
        // Using currentNote.note_id here
        let updatedNote;
        if (colorId === "dark") {
          updatedNote = { ...note, color: "#262326" };
        } else if (colorId === "red") {
          updatedNote = { ...note, color: "#8a4a41" };
        } else if (colorId === "violet") {
          updatedNote = { ...note, color: "#444d92" };
        } else if (colorId === "green") {
          updatedNote = { ...note, color: "#3b5c46" };
        } else {
          updatedNote = { ...note, color: "#262326" };
        }
        return updatedNote;
      }
      return note;
    });

    // Update the notes array within the copied pinnedPage
    updatedPinnedPage.notes = updatedPinnedNotes;

    // Dispatch actions to update the Redux store for the pinnedPage
    dispatch(setPinnedPage(updatedPinnedPage));
  }

  function toggleEdit() {
    dispatch(setEdit(!edit));
  }
  function handleSave() {
    // Get the updated content from the input fields or textareas
    const updatedTitle =
      titleRef.current.value || currentNotee.title || "Note title";
    const updatedTagline =
      taglineRef.current.value ||
      currentNotee.tagline ||
      "Note's tagline, add you tagline here";
    const updatedBody =
      bodyRef.current.value ||
      currentNotee.body ||
      "note's body, add your content here";
    const updatedDate = new Date().toLocaleString();
    // Create a shallow copy of the currentPage object
    const updatedPage = { ...currentPage };

    // Create a new notes array with the updated note content
    const updatedNotes = updatedPage.notes.map((note, index) => {
      if (index === currentNoteIndex) {
        return {
          ...note,
          title: updatedTitle,
          tagline: updatedTagline,
          body: updatedBody,
          lastUpdated: updatedDate,
        };
      }
      return note;
    });

    // Update the notes array within the copied page
    updatedPage.notes = updatedNotes;

    // Dispatch actions to update the Redux store
    dispatch(
      setPages(
        pages.map((page) =>
          page.page_id === updatedPage.page_id ? updatedPage : page
        )
      )
    );
    dispatch(setCurrentPage(updatedPage));

    // Update currentNotee with the new content
    setCurrentNotee({
      ...currentNotee,
      title: updatedTitle,
      tagline: updatedTagline,
      body: updatedBody,
      lastUpdated: updatedDate,
    });
    dispatch(setEdit(!edit));
  }

  function handleClose(e) {
    e.stopPropagation();

    const notes = notesRef.current;
    notes.style.animation = "fadingNote 0.4s linear 0s 1 forwards";

    setTimeout(() => {
      dispatch(setRouteLocation(1));
    }, 1100);
  }

  
  return (
    <div className="dashboard-container notes-container" ref={notesRef}>
      <div className="neo-notes-logo d-flex align-items-center">
        <div className="me-auto">
          <div className="color-block-container">
            <div className="color-block" onClick={setNoteTheme} id="dark"></div>
            <div
              className="color-block color-block-red"
              onClick={setNoteTheme}
              id="red"
            ></div>
            <div
              className="color-block color-block-violet"
              onClick={setNoteTheme}
              id="violet"
            ></div>
            <div
              className="color-block color-block-green"
              onClick={setNoteTheme}
              id="green"
            ></div>
          </div>
        </div>
        <img
          src={colorToImageMap[currentNotee.color]}
          className="neo-notes-logo-img"
          onClick={()=> dispatch(setRouteLocation(0))}
        ></img>
      </div>
      {!edit ? (
        <>
          <div
            className="me-auto page-name edit-title position-relative"
            style={{
              color: currentNotee.color,
            }}
            onClick={toggleEdit}
          >
            {currentNotee.title}&nbsp;&nbsp;
            <span className="close-btn" onClick={handleClose}>
              close
            </span>
            <div onClick={toggleEdit}>
              <img
                className="edit-btn"
                src={colorToImageEditMap[currentNotee.color]}
              ></img>
            </div>
            <div
              onClick={(event) => {
                event.stopPropagation();
                if (currentNotee.pinned) {
                  removePinnedNote(currentNotee);
                } else {
                  addPinnedNote(currentNotee);
                }
              }}
            >
              <img
                src={
                  currentNotee.pinned
                    ? colorToImageBookMarkFullMap[currentNotee.color]
                    : colorToImageBookMarkMap[currentNotee.color]
                }
                className="edit-note-pin-btn-img"
                id="edit-note-pin-btn-img-id"
              ></img>
            </div>
          </div>
          <div
            className="w-100 edit-tagline"
            style={{
              color: currentNotee.color,
            }}
            onClick={toggleEdit}
          >
            {currentNotee.tagline}
          </div>
          <div
            className="w-100 edit-body"
            style={{
              color: currentNotee.color,
              wordWrap: "break-word",
            }}
            onClick={toggleEdit}
          >
            {currentNotee.body}
          </div>
        </>
      ) : (
        <>
          <div
            className="me-auto page-name edit-title note-title-edit position-relative"
            style={{
              color: currentNotee.color,
            }}
          >
            <input
              ref={titleRef}
              className="note-title-edit-input w-100"
              onClick={(e) => e.preventDefault()}
              type="text"
              placeholder={currentNotee.title}
            ></input>
            <div onClick={handleSave} /* start here */>
              <img
                className="edit-btn"
                src={colorToImageSaveMap[currentNotee.color]}
              ></img>
            </div>
          </div>
          <div
            className="w-100 edit-tagline note-tagline-edit"
            style={{
              color: currentNotee.color,
            }}
          >
            <input
              ref={taglineRef}
              className="note-tagline-edit-input w-100"
              onClick={(e) => e.preventDefault()}
              type="text"
              placeholder={currentNotee.tagline}
            ></input>
          </div>
          <div
            className="w-100 edit-body note-body-edit"
            style={{
              color: currentNotee.color,
            }}
          >
            <textarea
              ref={bodyRef}
              className="note-body-edit-input w-100"
              onClick={(e) => e.preventDefault()}
              placeholder={currentNotee.body}
            ></textarea>
          </div>
        </>
      )}
      <div
        className="page-id"
        style={{
          color: currentNotee.color,
        }}
      >
        <span className="note-id">
          <span className="note-slash">/</span>
          <span>0{parseInt(currentNote.id.split("-")[1])}</span>{" "}
        </span>
        <span className="page-slash">/</span>0{currentNote.page_id}
      </div>
      <div className="last-update-date" style={{
              color: currentNotee.color,
            }}>
        {currentNotee.lastUpdated}
      </div>
    </div>
  );
}
