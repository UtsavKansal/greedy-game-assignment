import React, { useEffect, useState } from "react";
import "./SettingsPanel.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useDispatch } from "react-redux";
import { MetricActions } from "../storeo/MetricSlice";
import CustomButton from "./CustomButton";
import { columnsObject } from "./Columns";
import { useSelector } from "react-redux";
import { RootState } from "../storeo/store";

interface SettingsPanelProps {
  toggelSettings: () => void;
  showSettings: boolean;
}

const SettingsPanel = ({
  toggelSettings,
  showSettings,
}: SettingsPanelProps) => {
  const selectedMetrics = useSelector(
    (state: RootState) => state.metric.selectedMetrics
  );
  const metrics = useSelector((state: RootState) => state.metric.metrics);
  const [currentSelectedMetrics, setCurrentSelectedMetrics] = useState<
    string[]
  >([]);
  const [currentMetrics, setCurrentMetrics] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showSettings) {
      setCurrentSelectedMetrics(selectedMetrics);
      setCurrentMetrics(metrics);
    }
  }, [showSettings, selectedMetrics, metrics]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(currentMetrics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCurrentMetrics(items);
  };
  const handleClick = (value: string) => {
    if (currentSelectedMetrics.includes(value)) {
      setCurrentSelectedMetrics(
        currentSelectedMetrics.filter((item) => item !== value)
      );
    } else {
      setCurrentSelectedMetrics([...currentSelectedMetrics, value]);
    }
  };

  const onAccept = () => {
    dispatch(MetricActions.setSelectedMetrics(currentSelectedMetrics));
    dispatch(MetricActions.setMetrics(currentMetrics));
    toggelSettings();
  };

  const onClose = () => {
    toggelSettings();
  };

  return (
    <div className="settings_pannel">
      <h6>Dimension and Metric</h6>
      <div className="acontainer">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="metrics"
            direction="horizontal"
            ignoreContainerClipping={true}
          >
            {(provided) => (
              <div
                className="acontainer"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {currentMetrics.map((item, index) => {
                  return (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided) => {
                        return (
                          <div
                            onClick={() => {
                              handleClick(item);
                            }}
                          >
                            <div
                              className={
                                currentSelectedMetrics.includes(item)
                                  ? "metric-active"
                                  : "metric"
                              }
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {columnsObject[item].name}
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="buttom_button">
        <CustomButton label="Close" type="primary" onClick={onClose} />
        <CustomButton
          label="Apply Changes"
          type="secondary"
          onClick={onAccept}
        />
      </div>
    </div>
  );
};
export default SettingsPanel;
