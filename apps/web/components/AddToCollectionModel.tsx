import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { toggleModel } from "@/stores/player/currentAudioPlayer";
import { useState } from "react";
import {
  CreateCollectionStatus,
  renameCollection,
} from "../stores/player/currentAudioPlayer";
import { useRouter } from "next/router";
import {
  addTrackToCollection,
  createNewCollection,
} from "../stores/player/currentAudioPlayer";
import { toast } from "react-toastify";

function AddToCollectionModel() {
  const {
    isModelOpen,
    collections,
    passedDataToModel,
    createCollectionStatus,
  } = useSelector((state: any) => state.player);

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const model = useRef<HTMLDivElement>(null); // Especificar el tipo de la referencia
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [name, setname] = useState<string>("");

  useEffect(() => {
    if (!isModelOpen) return;
    if (passedDataToModel.collection_name) {
      setname(passedDataToModel.collection_name);
    }

    function handleClick(event: MouseEvent) {
      if (model.current && !model.current.contains(event.target as Node)) {
        dispatch(toggleModel({ data: false, track_id: "" }));
      }
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isModelOpen]);

  useEffect(() => {
    if (
      createCollectionStatus === CreateCollectionStatus.done &&
      name.length !== 0
    ) {
      const collection = collections.find((e: any) => e.name === name);
      dispatch(toggleModel({ data: false, track_id: "" }));
      router.push(`/collection/${collection.id}`);
    }
  }, [createCollectionStatus]);

  const handleItemClick = (collectionId: any, trackId: any) => {
    dispatch(
      addTrackToCollection({
        token: user.token,
        collection_id: collectionId,
        track_id: trackId,
      })
    );
    dispatch(toggleModel({ data: false, track_id: "" }));
    toast.success("¡Añadido a playlist!", {
      className: "text-cyan-400",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      setShowResults(true);
      setResults(
        collections.filter((col: any) =>
          col.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setShowResults(false);
    }
  };

  return (
    <div>
      {isModelOpen && (
        <div className="fixed inset-0 w-full h-full bg-black z-40 bg-opacity-50 flex items-center justify-center">
          <div
            ref={model}
            className="w-80 rounded-md bg-[#1f1f1f] shadow-lg p-6 transition-all transform"
            style={{
              animation: isModelOpen
                ? "shake 0.5s ease-in-out"
                : "none",
            }}
          >
            {/* Flecha para volver atrás */}
            <div
              className="cursor-pointer text-white hover:text-cyan-400 mb-4"
              onClick={() => dispatch(toggleModel({ data: true, track_id: "" }))}
            >
              <i className="icon-arrow-left text-[24px]"></i>
            </div>

            {passedDataToModel.track_id === "NEW" ? (
              <div>
                <p className="font-ProximaBold text-cyan-400 px-3 pt-4">Elige un nombre:</p>
                <div className="rounded-md p-2.5 flex item-center justify-center flex-row">
                  <input
                    type="search"
                    placeholder="Playlist..."
                    onChange={(e) => setname(e.target.value)}
                    className="w-full px-4 py-1.5 outline-0 border-none text-white bg-[#4a4a4a] rounded-md"
                  />
                </div>
                <div className="px-2.5 pb-5 pt-2 w-full">
                  <button
                    disabled={
                      name.length === 0 ||
                      createCollectionStatus === CreateCollectionStatus.waiting
                    }
                    onClick={() => {
                      dispatch(
                        createNewCollection({
                          token: user.token,
                          name: name,
                          track_id: undefined,
                        })
                      );
                    }}
                    className="bg-[#2bb540] disabled:bg-[#287b34] w-full p-1.5 rounded-lg text-center uppercase text-white font-ProximaBold"
                  >
                    <p>Crear nueva</p>
                  </button>
                </div>
              </div>
            ) : passedDataToModel.track_id === "RENAME" ? (
              <div>
                <p className="font-ProximaBold text-cyan-400 px-3 pt-4">Renombrar colección:</p>
                <div className="rounded-md p-2.5 flex item-center justify-center flex-row">
                  <input
                    type="search"
                    placeholder="Colección #1"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="w-full px-4 py-1.5 outline-0 border-none text-white bg-[#4a4a4a] rounded-md"
                  />
                </div>
                <div className="px-2.5 pb-5 pt-2 w-full">
                  <button
                    disabled={name.length === 0}
                    onClick={() => {
                      dispatch(
                        renameCollection({
                          token: user.token,
                          collection_name: name,
                          collection_id: passedDataToModel.collection_id,
                        })
                      );
                      dispatch(toggleModel({ data: false, track_id: "" }));
                      toast.success("¡Colección renombrada!", {
                        className: "text-cyan-400",
                      });
                    }}
                    className="bg-[#2bb540] disabled:bg-[#287b34] w-full p-1.5 rounded-lg text-center uppercase text-white font-ProximaBold"
                  >
                    <p>Renombrar colección</p>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-ProximaBold text-cyan-400 px-3 pt-3 pb-1.5">Añadir a colección:</p>
                <p
                  className="text-cyan-400 px-3 pt-3 pb-1.5"
                  style={{ float: "right" }}
                >
                  <i
                    className="icon-arrow_back text-[20px] text-center pl-2 py-2 mobile:text-base mobile:py-1"
                    onClick={() => dispatch(toggleModel({ data: false, track_id: "" }))}
                  ></i>
                </p>
                <div className="rounded-md p-2.5 flex item-center justify-center flex-row">
                  <div className="rounded-tl-md rounded-bl-md bg-[#4a4a4a] flex items-center px-2">
                    <i className="icon-search text-white text-[20px] opacity-70"></i>
                  </div>
                  <input
                    type="search"
                    onChange={handleSearchChange}
                    placeholder="Buscar playlists..."
                    className="w-full px-0 py-1.5 outline-0 border-none text-white bg-[#4a4a4a] rounded-tr-md rounded-br-md"
                  />
                </div>
                <div className="px-3">
                  <div
                    onClick={() => {
                      dispatch(
                        createNewCollection({
                          token: user.token,
                          name: "Playlist " + passedDataToModel.track_id,
                          track_id: passedDataToModel.track_id,
                        })
                      );
                      dispatch(toggleModel({ data: true, track_id: "" }));
                      toast.success("¡Colección creada!", {
                        className: "text-cyan-400",
                      });
                    }}
                    className="font-ProximaBold cursor-pointer hover:bg-[#464646] px-2 py-2 text-white rounded"
                  >
                    <p> Crear Playlist</p>
                  </div>
                  <div className="border-b border-slate-700 py-1"></div>
                  <div className="h-[400px] overflow-y-scroll scrollbar">
                    {!showResults ? (
                      <div>
                        {collections.map((e: any) => (
                          <div
                            className="font-ProximaRegular tracking-wide text-[15px] hover:bg-[#4a4a4a] px-2 py-2 text-slate-200 rounded cursor-pointer"
                            key={e.id}
                            onClick={() => handleItemClick(e.id, passedDataToModel.track_id)}
                          >
                            {e.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {results.map((e: any) => (
                          <div
                            className="font-ProximaRegular tracking-wide text-[15px] hover:bg-[#4a4a4a] px-2 py-2 text-slate-200 rounded cursor-pointer"
                            key={e.id}
                            onClick={() => handleItemClick(e.id, passedDataToModel.track_id)}
                          >
                            {e.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToCollectionModel as any;