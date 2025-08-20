'use client';

import React from 'react';

export interface TimeLineStepItem {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    bottom?: {
        title?: string;
        description?: string;
    } | null;
}

interface TimeLineStepsProps {
    steps: TimeLineStepItem[];
    className?: string;
}

export default function TimeLineSteps({ steps, className = '' }: TimeLineStepsProps) {
    // Responsive layout without fixed container height
    const topMinHeightClass = 'min-h-[220px]';
    // Build a unified 3-row grid with interleaved columns so that
    // 1,3,5 cards sit on top row and 2,4 sit on bottom row.
    // Every card spans 3 virtual columns; nodes sit at the middle column of each card span.
    const totalCols = steps.length * 2 + 1; // e.g., 5 steps => 11 columns

    return (
        <div className={`relative ${className}`}>
            <div
                className="grid gap-x-6"
                style={{ gridTemplateRows: 'auto 40px auto', gridTemplateColumns: `repeat(${totalCols}, minmax(0,1fr))` }}
            >
                {/* Horizontal line */}
                <div className="col-span-full h-0.5 bg-[#fe585f]/40 self-center" style={{ gridRow: 2 }} />

                {(() => {
                    let topPos = 0;
                    let bottomPos = 0;
                    const items: React.ReactNode[] = [];

                    steps.forEach((step, index) => {
                        const isTop = index % 2 === 0; // 0,2,4 on top
                        const startCol = isTop ? topPos * 4 + 1 : bottomPos * 4 + 3; // 1,5,9... for top; 3,7,... for bottom
                        const endCol = startCol + 3; // span 3 columns
                        const nodeCol = startCol + 1; // middle of the span

                        // Card
                        items.push(
                            <div
                                key={`card-${index}`}
                                style={{ gridRow: isTop ? 1 : 3, gridColumn: `${startCol} / ${endCol}` }}
                                className="bg-white rounded-2xl border border-[#fe585f]/20 shadow-sm p-6"
                            >
                                <div className="text-base font-semibold text-gray-900 mb-2">{step.title}</div>
                                {step.description && (
                                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                )}
                            </div>
                        );

                        // Connector
                        items.push(
                            <div
                                key={`conn-${index}`}
                                style={{ gridRow: isTop ? 1 : 3, gridColumn: nodeCol }}
                                className={`w-0.5 bg-[#fe585f]/50 justify-self-center ${isTop ? 'self-end h-6' : 'self-start h-6'}`}
                            />
                        );

                        // Node
                        items.push(
                            <div
                                key={`node-${index}`}
                                style={{ gridRow: 2, gridColumn: nodeCol }}
                                className="w-3 h-3 rounded-full bg-[#fe585f] justify-self-center self-center"
                            />
                        );

                        if (isTop) topPos += 1; else bottomPos += 1;
                    });

                    return items;
                })()}
            </div>
        </div>
    );
}


