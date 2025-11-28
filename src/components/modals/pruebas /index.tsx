import {
  StyledGaugeContainer,
  StyledScoreText,
  StyledScoreDate,
  StyledScoreIndicator,
} from "./styles";

export interface RiskScoreGaugeProps {
  score: number;
  minScore?: number;
  maxScore?: number;
  reportDate?: string;
}

const segments = [
  { color: "#E53E3E", min: 150, max: 550 },
  { color: "#F6AD55", min: 550, max: 850 },
  { color: "#006F3C", min: 850, max: 950 },
];

const size = 260;
const centerX = size / 2;
const centerY = size / 2;

const radius = 110;
const strokeWidth = 8;

const MIN_SCORE_ANGLE = 225;
const TOTAL_ARC_SWEEP = 270;

const getCirclePoint = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = getCirclePoint(x, y, radius, endAngle);
  const end = getCirclePoint(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

export function RiskScoreGauge({
  score,
  minScore = 150,
  maxScore = 950,
  reportDate = "DD/MMM/AAAA",
}: RiskScoreGaugeProps) {
  const scoreRange = maxScore - minScore;
  const clampedScore = Math.max(minScore, Math.min(maxScore, score));
  const scorePercentage = (clampedScore - minScore) / scoreRange;

  const angleOffset = scorePercentage * TOTAL_ARC_SWEEP;
  let scoreAngle = MIN_SCORE_ANGLE + angleOffset;

  if (scoreAngle > 360) {
    scoreAngle -= 360;
  }

  const indicatorRadius = radius;
  const indicatorPoint = getCirclePoint(
    centerX,
    centerY,
    indicatorRadius,
    scoreAngle,
  );

  return (
    <StyledGaugeContainer>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((segment) => {
          const segmentMinPercentage = (segment.min - minScore) / scoreRange;
          const segmentMaxPercentage = (segment.max - minScore) / scoreRange;

          const segmentStartAngle =
            MIN_SCORE_ANGLE + segmentMinPercentage * TOTAL_ARC_SWEEP;
          const segmentEndAngle =
            MIN_SCORE_ANGLE + segmentMaxPercentage * TOTAL_ARC_SWEEP;

          const adjustedStartAngle =
            segmentStartAngle > 360
              ? segmentStartAngle - 360
              : segmentStartAngle;
          const adjustedEndAngle =
            segmentEndAngle > 360 ? segmentEndAngle - 360 : segmentEndAngle;

          return (
            <path
              key={segment.color}
              d={describeArc(
                centerX,
                centerY,
                radius,
                adjustedStartAngle,
                adjustedEndAngle,
              )}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <StyledScoreIndicator $left={indicatorPoint.x} $top={indicatorPoint.y} />

      <StyledScoreText>
        <span className="score-label">Score de riesgo</span>
        <span className="score-value">{score}</span>
      </StyledScoreText>

      <StyledScoreText $isMin={true}>{minScore}</StyledScoreText>
      <StyledScoreText $isMax={true}>{maxScore}</StyledScoreText>

      <StyledScoreDate>
        El score reportado es de <span>{reportDate}</span>
      </StyledScoreDate>
    </StyledGaugeContainer>
  );
}
