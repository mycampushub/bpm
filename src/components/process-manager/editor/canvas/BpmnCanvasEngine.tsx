
import React, { useRef, useEffect, useState } from 'react';
import { BpmnElement, BpmnConnection } from '../types';

interface BpmnCanvasEngineProps {
  elements: BpmnElement[];
  connections: BpmnConnection[];
  selectedElement: string | null;
  selectedTool: string;
  zoomLevel: number;
  showGrid: boolean;
  snapToGrid: boolean;
  connectingElement: string | null;
  mousePosition: { x: number; y: number };
  onElementSelect: (id: string | null) => void;
  onElementDragStart: (e: React.MouseEvent, elementId: string) => void;
  onElementDragMove: (e: React.MouseEvent) => void;
  onElementDragEnd: () => void;
  onElementUpdate: (elementId: string, updates: any) => void;
  onConnectionCreate: (sourceId: string, targetId: string) => void;
  onCanvasClick: (e: React.MouseEvent) => void;
}

export const BpmnCanvasEngine: React.FC<BpmnCanvasEngineProps> = ({
  elements,
  connections,
  selectedElement,
  selectedTool,
  zoomLevel,
  showGrid,
  snapToGrid,
  connectingElement,
  mousePosition,
  onElementSelect,
  onElementDragStart,
  onElementDragMove,
  onElementDragEnd,
  onElementUpdate,
  onConnectionCreate,
  onCanvasClick
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Handle canvas resize
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setCanvasSize({ width: rect.width, height: rect.height });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const handleElementClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    
    if (selectedTool === 'connector' && connectingElement && connectingElement !== elementId) {
      onConnectionCreate(connectingElement, elementId);
    } else {
      onElementSelect(elementId);
    }
  };

  const handleElementMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (selectedTool === 'select') {
      const element = elements.find(el => el.id === elementId);
      if (element) {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          setDraggedElement(elementId);
          setDragOffset({
            x: e.clientX - rect.left - element.x * (zoomLevel / 100),
            y: e.clientY - rect.top - element.y * (zoomLevel / 100)
          });
          onElementDragStart(e, elementId);
        }
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedElement && selectedTool === 'select') {
      const element = elements.find(el => el.id === draggedElement);
      if (element && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        let newX = (e.clientX - rect.left - dragOffset.x) / (zoomLevel / 100);
        let newY = (e.clientY - rect.top - dragOffset.y) / (zoomLevel / 100);

        // Constrain to canvas bounds
        newX = Math.max(0, Math.min(newX, canvasSize.width / (zoomLevel / 100) - element.width));
        newY = Math.max(0, Math.min(newY, canvasSize.height / (zoomLevel / 100) - element.height));

        if (snapToGrid) {
          newX = Math.round(newX / 20) * 20;
          newY = Math.round(newY / 20) * 20;
        }

        onElementUpdate(draggedElement, { x: newX, y: newY });
      }
      onElementDragMove(e);
    }
  };

  const handleMouseUp = () => {
    if (draggedElement) {
      setDraggedElement(null);
      onElementDragEnd();
    }
  };

  const renderElement = (element: BpmnElement) => {
    const isSelected = selectedElement === element.id;
    const isConnecting = connectingElement === element.id;
    
    let shapeContent;
    const baseClasses = `absolute border-2 cursor-pointer transition-all duration-200 select-none ${
      isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-400'
    } ${isConnecting ? 'border-green-500 shadow-green-200' : ''}`;

    const scaledStyle = {
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      transform: `scale(${zoomLevel / 100})`,
      transformOrigin: 'top left'
    };

    switch (element.type) {
      case 'start-event':
        shapeContent = (
          <div 
            className={`${baseClasses} bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200`}
            style={scaledStyle}
          >
            <span className="text-xs font-medium text-green-800">S</span>
          </div>
        );
        break;
      
      case 'end-event':
        shapeContent = (
          <div 
            className={`${baseClasses} bg-red-100 rounded-full flex items-center justify-center border-4 hover:bg-red-200`}
            style={scaledStyle}
          >
            <span className="text-xs font-medium text-red-800">E</span>
          </div>
        );
        break;
      
      case 'exclusive-gateway':
        shapeContent = (
          <div 
            className={`${baseClasses} bg-yellow-100 transform rotate-45 flex items-center justify-center hover:bg-yellow-200`}
            style={scaledStyle}
          >
            <span className="text-xs font-bold text-yellow-800 transform -rotate-45">X</span>
          </div>
        );
        break;
      
      case 'parallel-gateway':
        shapeContent = (
          <div 
            className={`${baseClasses} bg-blue-100 transform rotate-45 flex items-center justify-center hover:bg-blue-200`}
            style={scaledStyle}
          >
            <span className="text-xs font-bold text-blue-800 transform -rotate-45">+</span>
          </div>
        );
        break;
      
      default: // tasks
        shapeContent = (
          <div 
            className={`${baseClasses} bg-blue-50 rounded-lg flex flex-col items-center justify-center p-2 hover:bg-blue-100`}
            style={scaledStyle}
          >
            <span className="text-xs font-medium text-blue-800 text-center leading-tight break-words">
              {element.name}
            </span>
          </div>
        );
    }

    return (
      <div
        key={element.id}
        onClick={(e) => handleElementClick(e, element.id)}
        onMouseDown={(e) => handleElementMouseDown(e, element.id)}
      >
        {shapeContent}
      </div>
    );
  };

  const renderConnection = (connection: BpmnConnection) => {
    const sourceElement = elements.find(el => el.id === connection.source);
    const targetElement = elements.find(el => el.id === connection.target);
    
    if (!sourceElement || !targetElement) return null;

    const scale = zoomLevel / 100;
    const startX = (sourceElement.x + sourceElement.width / 2) * scale;
    const startY = (sourceElement.y + sourceElement.height / 2) * scale;
    const endX = (targetElement.x + targetElement.width / 2) * scale;
    const endY = (targetElement.y + targetElement.height / 2) * scale;

    return (
      <svg
        key={connection.id}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        width="100%"
        height="100%"
      >
        <defs>
          <marker
            id={`arrowhead-${connection.id}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#374151"
            />
          </marker>
        </defs>
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#374151"
          strokeWidth="2"
          markerEnd={`url(#arrowhead-${connection.id})`}
        />
      </svg>
    );
  };

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-white overflow-auto min-h-[600px]"
      style={{ 
        backgroundImage: showGrid ? 
          `radial-gradient(circle, #e5e7eb 1px, transparent 1px)` : 'none',
        backgroundSize: showGrid ? `${20 * (zoomLevel / 100)}px ${20 * (zoomLevel / 100)}px` : 'auto'
      }}
      onClick={onCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Render connections first (behind elements) */}
      {connections.map(renderConnection)}
      
      {/* Render elements */}
      {elements.map(renderElement)}
      
      {/* Connection preview line */}
      {connectingElement && selectedTool === 'connector' && (
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          <line
            x1={(elements.find(el => el.id === connectingElement)?.x! + 50) * (zoomLevel / 100)}
            y1={(elements.find(el => el.id === connectingElement)?.y! + 40) * (zoomLevel / 100)}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      )}
    </div>
  );
};
