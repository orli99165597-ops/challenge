const STORAGE_KEY = "challenge-manager-mvp-v1";

const typeLabels = {
  fairy_tale: "AI 동화",
  poem_art: "시화",
  blog: "블로그",
  instagram: "인스타",
};

const statusLabels = {
  draft: "작성중",
  open: "모집중",
  closed: "모집 종료",
  completed: "종료",
  active: "참가중",
  dropped: "중도 포기",
  submitted: "제출 완료",
  reviewing: "검수 중",
  approved: "승인",
  rejected: "반려",
  needs_check: "추가 확인",
  scheduled: "지급 예정",
  held: "지급 보류",
  paid: "지급 완료",
  excluded: "지급 제외",
  unregistered: "미등록",
  pending: "검수 대기",
};

const paymentStatusLabels = {
  not_billable: "과금 대상 아님",
  billing_scheduled: "청구 예정",
  billed: "청구 완료",
  paid: "수금 완료",
  waived: "무료/면제",
};

const fairyPreviewGif = "/assets/ai-fairy-preview.gif";
const poemArtPreviewImage = "/assets/poem-art-preview.gif";
const blogBikePreviewImage = "/assets/blog-bike-preview.gif";
const instagramPreviewGif = "/assets/instagram-preview.gif";
const appPetGif = "/assets/app-pet.gif";
const fairyChallengeStart = "2026-07-01";
const fairyChallengeEnd = "2026-07-22";
const defaultChallengeStart = "2026-07-01";
const defaultChallengeEnd = "2026-07-22";
const fairyChallengeTitle = "AI 동화 전자책 1권 완성 챌린지";
const fairyChallengeDescription = "AI 동화 창작이 아직 어색한 분들도 22일 동안 글과 이미지를 매일 쌓아가며, 나만의 전자책 1권을 완성하는 실전형 챌린지입니다.";
const ownerAdminEmail = "orli99165597@gmail.com";
const ownerAdminPassword = "5322";
const challengeEntryFee = 30000;
const challengeSuccessFee = 20000;
const challengeFeeDescription = "회비 30,000원, 22일 하루도 빠짐없이 인증 완료 시 20,000원 환급";
const aiToolConditionDescription = "미드저니 유료 계정과 GPT 사용 준비 필수, 제미나이 또는 클로드 선택 활용 가능";

function challengeTemplate(type = "fairy_tale") {
  const templates = {
    fairy_tale: {
      title: fairyChallengeTitle,
      description: "AI 동화 창작이 아직 어색한 분들도 22일 동안 글과 이미지를 매일 쌓아가며, 나만의 전자책 1권을 완성하는 실전형 챌린지입니다.",
      reward_description: `${challengeFeeDescription}, ${aiToolConditionDescription}`,
    },
    poem_art: {
      title: "22일 시화집 완성 챌린지",
      description: "시화 창작이 익숙한 분들이 22일 동안 짧은 시와 이미지를 쌓아가며, 나만의 시화 전자책을 완성하는 실전형 챌린지입니다.",
      reward_description: `${challengeFeeDescription}, ${aiToolConditionDescription}`,
    },
    blog: {
      title: "22일 블로그 글쓰기 챌린지",
      description: "22일 동안 블로그 글을 꾸준히 작성하고 링크와 완료 캡처를 제출하며, 나만의 글쓰기 흐름을 완성하는 챌린지입니다.",
      reward_description: challengeFeeDescription,
    },
    instagram: {
      title: "22일 인스타 릴스 제작 챌린지",
      description: "22일 동안 인스타 릴스를 제작하고 업로드 기록을 남기며, 짧은 영상 콘텐츠 감각을 키우는 챌린지입니다.",
      reward_description: challengeFeeDescription,
    },
  };
  return templates[type] || templates.fairy_tale;
}

const badgeClass = {
  open: "success",
  active: "success",
  approved: "success",
  paid: "success",
  completed: "success",
  submitted: "primary",
  reviewing: "primary",
  scheduled: "primary",
  pending: "warning",
  needs_check: "warning",
  held: "warning",
  closed: "warning",
  rejected: "danger",
  excluded: "danger",
  dropped: "danger",
};

const app = document.querySelector("#app");

let state = loadState();
let view = {
  page: state.session ? (currentUser()?.role === "admin" ? "admin" : "home") : "auth",
  authMode: "login",
  challengeFilter: "all",
  selectedChallengeId: null,
  selectedMissionId: null,
  selectedSubmissionId: null,
  adminPage: "dashboard",
  selectedAdminSubmissionId: null,
};

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function dateAddISO(dateString, days) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function nowText() {
  return new Date().toLocaleString("ko-KR", { hour12: false });
}

function fileDateTime(dateString, time = "23:59:00") {
  return new Date(`${dateString}T${time}+09:00`);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    return ensureExampleChallenges(parsed);
  }

  const start = todayISO();
  const fairyId = uid("challenge");
  const poemId = uid("challenge");
  const blogId = uid("challenge");
  const instagramId = uid("challenge");
  const adminId = uid("user");
  const userId = uid("user");

  const initial = {
    session: null,
    users: [
      {
        id: adminId,
        email: "admin@demo.com",
        password: "admin123",
        nickname: "운영자",
        role: "admin",
        created_at: nowText(),
      },
      {
        id: uid("user"),
        email: ownerAdminEmail,
        password: ownerAdminPassword,
        nickname: "운영자",
        role: "admin",
        created_at: nowText(),
      },
      {
        id: userId,
        email: "user@demo.com",
        password: "user123",
        nickname: "참가자",
        role: "user",
        created_at: nowText(),
      },
    ],
    challenges: [
      {
        id: fairyId,
        type: "fairy_tale",
        title: fairyChallengeTitle,
        description: fairyChallengeDescription,
        start_date: fairyChallengeStart,
        end_date: fairyChallengeEnd,
        daily_deadline_time: "23:59:00",
        entry_fee: challengeEntryFee,
        is_paid: true,
        status: "open",
        reward_description: `${challengeFeeDescription}, ${aiToolConditionDescription}`,
      },
      {
        id: poemId,
        type: "poem_art",
        title: "22일 시화집 완성 챌린지",
        description: challengeTemplate("poem_art").description,
        start_date: defaultChallengeStart,
        end_date: defaultChallengeEnd,
        daily_deadline_time: "23:59:00",
        entry_fee: challengeEntryFee,
        is_paid: true,
        status: "open",
        reward_description: `${challengeFeeDescription}, ${aiToolConditionDescription}`,
      },
      {
        id: blogId,
        type: "blog",
        title: "22일 블로그 글쓰기 챌린지",
        description: challengeTemplate("blog").description,
        start_date: defaultChallengeStart,
        end_date: defaultChallengeEnd,
        daily_deadline_time: "23:59:00",
        entry_fee: challengeEntryFee,
        is_paid: true,
        status: "open",
        reward_description: challengeFeeDescription,
      },
      {
        id: instagramId,
        type: "instagram",
        title: "22일 인스타 릴스 제작 챌린지",
        description: challengeTemplate("instagram").description,
        start_date: defaultChallengeStart,
        end_date: defaultChallengeEnd,
        daily_deadline_time: "23:59:00",
        entry_fee: challengeEntryFee,
        is_paid: true,
        status: "open",
        reward_description: challengeFeeDescription,
      },
    ],
    missions: [],
    participations: [],
    submissions: [],
    attachments: [],
    likes: [],
    rewards: [],
    payoutAccounts: [],
    auditLogs: [],
    signupNotifications: [],
    adminNotes: [],
  };

  initial.missions = [
    ...initial.challenges.flatMap(buildMissions),
  ];

  const seededParticipation = {
    id: uid("participation"),
    user_id: userId,
    challenge_id: fairyId,
    payment_status: "paid",
    status: "active",
    joined_at: nowText(),
    total_score: 0,
    rank: null,
  };
  initial.participations.push(seededParticipation);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function createPoemArtChallenge(start = todayISO()) {
  const template = challengeTemplate("poem_art");
  return {
    id: uid("challenge"),
    type: "poem_art",
    title: template.title,
    description: template.description,
    start_date: start,
    end_date: dateAddISO(start, 21),
    daily_deadline_time: "23:59:00",
    entry_fee: challengeEntryFee,
    is_paid: true,
    status: "open",
    reward_description: template.reward_description,
  };
}

function ensureExampleChallenges(savedState) {
  let changed = false;

  if (!Array.isArray(savedState.auditLogs)) {
    savedState.auditLogs = [];
    changed = true;
  }
  if (!Array.isArray(savedState.signupNotifications)) {
    savedState.signupNotifications = [];
    changed = true;
  }
  if (!Array.isArray(savedState.adminNotes)) {
    savedState.adminNotes = [];
    changed = true;
  }

  const ownerAdmin = savedState.users.find((user) => user.email === ownerAdminEmail);
  if (ownerAdmin) {
    if (ownerAdmin.role !== "admin" || ownerAdmin.password !== ownerAdminPassword) {
      ownerAdmin.role = "admin";
      ownerAdmin.password = ownerAdminPassword;
      ownerAdmin.nickname = ownerAdmin.nickname || "운영자";
      changed = true;
    }
  } else {
    savedState.users.push({
      id: uid("user"),
      email: ownerAdminEmail,
      password: ownerAdminPassword,
      nickname: "운영자",
      role: "admin",
      created_at: nowText(),
    });
    changed = true;
  }

  if (!savedState.challenges.some((challenge) => challenge.type === "poem_art")) {
    const challenge = createPoemArtChallenge();
    savedState.challenges.push(challenge);
    savedState.missions.push(...buildMissions(challenge));
    changed = true;
  }

  const duplicatedFairyChallenges = savedState.challenges.filter((challenge) => (
    challenge.type === "fairy_tale" && challenge.title === fairyChallengeTitle
  ));
  if (duplicatedFairyChallenges.length > 1) {
    const keepChallenge = duplicatedFairyChallenges.find((challenge) => (
      savedState.participations.some((participation) => participation.challenge_id === challenge.id)
    )) || duplicatedFairyChallenges[0];
    const removeChallengeIds = new Set(
      duplicatedFairyChallenges
        .filter((challenge) => challenge.id !== keepChallenge.id)
        .map((challenge) => challenge.id),
    );
    const removeParticipationIds = new Set(
      savedState.participations
        .filter((participation) => removeChallengeIds.has(participation.challenge_id))
        .map((participation) => participation.id),
    );
    const removeSubmissionIds = new Set(
      savedState.submissions
        .filter((submission) => removeParticipationIds.has(submission.participation_id))
        .map((submission) => submission.id),
    );

    savedState.challenges = savedState.challenges.filter((challenge) => !removeChallengeIds.has(challenge.id));
    savedState.missions = savedState.missions.filter((mission) => !removeChallengeIds.has(mission.challenge_id));
    savedState.participations = savedState.participations.filter((participation) => !removeChallengeIds.has(participation.challenge_id));
    savedState.submissions = savedState.submissions.filter((submission) => !removeParticipationIds.has(submission.participation_id));
    savedState.attachments = savedState.attachments.filter((attachment) => !removeSubmissionIds.has(attachment.submission_id));
    savedState.likes = savedState.likes.filter((like) => !removeSubmissionIds.has(like.submission_id));
    savedState.rewards = savedState.rewards.filter((reward) => !removeParticipationIds.has(reward.participation_id));
    changed = true;
  }

  savedState.challenges
    .filter((challenge) => challenge.type === "fairy_tale")
    .forEach((challenge) => {
      if (challenge.title !== fairyChallengeTitle) {
        challenge.title = fairyChallengeTitle;
        changed = true;
      }
      if (challenge.description !== fairyChallengeDescription) {
        challenge.description = fairyChallengeDescription;
        changed = true;
      }
      const expectedDescription = challenge.type === "fairy_tale"
        ? `${challengeFeeDescription}, ${aiToolConditionDescription}`
        : challengeFeeDescription;
      if (challenge.entry_fee !== challengeEntryFee || challenge.reward_description !== expectedDescription) {
        challenge.entry_fee = challengeEntryFee;
        challenge.is_paid = true;
        challenge.reward_description = expectedDescription;
        changed = true;
      }
      if (challenge.start_date !== fairyChallengeStart || challenge.end_date !== fairyChallengeEnd) {
        challenge.start_date = fairyChallengeStart;
        challenge.end_date = fairyChallengeEnd;
        savedState.missions = savedState.missions.filter((mission) => mission.challenge_id !== challenge.id);
        savedState.missions.push(...buildMissions(challenge));
        changed = true;
      }
    });

  savedState.challenges
    .filter((challenge) => challenge.type === "youtube" || challenge.type === "instagram")
    .forEach((challenge) => {
      if (challenge.type !== "instagram") {
        challenge.type = "instagram";
        changed = true;
      }
      if (challenge.title !== "22일 인스타 릴스 제작 챌린지") {
        challenge.title = "22일 인스타 릴스 제작 챌린지";
        changed = true;
      }
      if (challenge.description !== "22일 동안 인스타 릴스 링크와 업로드 완료 캡처를 제출하는 크리에이터 챌린지입니다.") {
        challenge.description = "22일 동안 인스타 릴스 링크와 업로드 완료 캡처를 제출하는 크리에이터 챌린지입니다.";
        changed = true;
      }
    });

  savedState.challenges
    .filter((challenge) => challenge.type === "blog")
    .forEach((challenge) => {
      if (challenge.title !== "22일 블로그 글쓰기 챌린지") {
        challenge.title = "22일 블로그 글쓰기 챌린지";
        changed = true;
      }
      if (challenge.description !== "22일 동안 블로그 글 링크와 작성 완료 캡처를 제출해 글쓰기 흐름을 완성합니다.") {
        challenge.description = "22일 동안 블로그 글 링크와 작성 완료 캡처를 제출해 글쓰기 흐름을 완성합니다.";
        changed = true;
      }
    });

  savedState.challenges.forEach((challenge) => {
    const expectedDescription = ["fairy_tale", "poem_art"].includes(challenge.type)
      ? `${challengeFeeDescription}, ${aiToolConditionDescription}`
      : challengeFeeDescription;
    if (challenge.entry_fee !== challengeEntryFee || !challenge.is_paid || challenge.reward_description !== expectedDescription) {
      challenge.entry_fee = challengeEntryFee;
      challenge.is_paid = true;
      challenge.reward_description = expectedDescription;
      changed = true;
    }
    if (challenge.start_date !== defaultChallengeStart || challenge.end_date !== defaultChallengeEnd) {
      challenge.start_date = defaultChallengeStart;
      challenge.end_date = defaultChallengeEnd;
      savedState.missions = savedState.missions.filter((mission) => mission.challenge_id !== challenge.id);
      savedState.missions.push(...buildMissions(challenge));
      changed = true;
    }
  });

  savedState.challenges
    .filter((challenge) => {
      if (challenge.type !== "poem_art") return false;
      const missions = savedState.missions.filter((mission) => mission.challenge_id === challenge.id);
      return !challenge.title.includes("22일") || missions.length !== 22 || !missions.some((mission) => mission.day_number === 21 && mission.title.includes("전자책"));
    })
    .forEach((challenge) => {
      challenge.title = "22일 시화집 완성 챌린지";
      challenge.description = "20일 동안 짧은 시와 어울리는 이미지를 쌓고, 마지막 2일은 전자책으로 정리합니다.";
      challenge.end_date = dateAddISO(challenge.start_date, 21);
      savedState.missions = savedState.missions.filter((mission) => mission.challenge_id !== challenge.id);
      savedState.missions.push(...buildMissions(challenge));
      changed = true;
    });

  savedState.challenges.forEach((challenge) => {
    const template = challengeTemplate(challenge.type);
    if (!template) return;
    if (challenge.description !== template.description) {
      challenge.description = template.description;
      changed = true;
    }
    if (challenge.reward_description !== template.reward_description) {
      challenge.reward_description = template.reward_description;
      changed = true;
    }
  });

  savedState.participations.forEach((participation) => {
    if (participation.payment_status === "pending") {
      participation.payment_status = "billing_scheduled";
      changed = true;
    }
    if (participation.payment_status === "none") {
      participation.payment_status = "not_billable";
      changed = true;
    }
  });

  if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
  return savedState;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addAuditLog(action, target, detail = "") {
  state.auditLogs = state.auditLogs || [];
  state.auditLogs.unshift({
    id: uid("audit"),
    action,
    target,
    detail,
    actor: currentUser()?.email || "system",
    created_at: nowText(),
  });
  state.auditLogs = state.auditLogs.slice(0, 80);
}

function addSignupNotification(user) {
  state.signupNotifications = state.signupNotifications || [];
  state.signupNotifications.unshift({
    id: uid("notice"),
    user_id: user.id,
    email: user.email,
    nickname: user.nickname,
    recipient: ownerAdminEmail,
    created_at: nowText(),
    read: false,
  });
  state.signupNotifications = state.signupNotifications.slice(0, 30);
  addAuditLog("신규 회원 가입", user.email, `${user.nickname || "참가자"}님이 가입했습니다.`);
}

function buildMissions(challenge) {
  const missions = [];
  const days = 22;

  for (let index = 1; index <= days; index += 1) {
    let title = "일일 미션";
    let description = "결과물을 제출하세요.";
    let required_page_count = 0;
    let required_link = false;
    let required_capture = false;
    let required_file = false;

    if (challenge.type === "fairy_tale") {
      if (index <= 20) {
        title = `${index}일차: 2쪽 작성`;
        description = "오늘 분량 2쪽을 작성하고 텍스트, 이미지, 캡처 중 1개 이상을 제출하세요.";
        required_page_count = 2;
      } else if (index === 21) {
        title = "21일차: 전체 페이지 업스케일";
        description = "전체 페이지 업스케일 완료 캡처 또는 결과 파일을 제출하세요.";
        required_capture = true;
      } else {
        title = "22일차: PDF 제작 및 출판 준비";
        description = "최종 PDF 파일을 제출하세요.";
        required_file = true;
      }
    }

    if (challenge.type === "blog") {
      title = `${index}일차: 블로그 글 제출`;
      description = "블로그 글 URL과 작성 완료 캡처 이미지를 제출하세요.";
      required_link = true;
      required_capture = true;
    }

    if (challenge.type === "poem_art") {
      if (index <= 20) {
        title = `${index}일차: 시 1편과 이미지 1장`;
        description = "오늘의 시와 어울리는 시화 이미지 또는 제작 캡처를 제출하세요.";
        required_page_count = 1;
        required_capture = true;
      } else if (index === 21) {
        title = "21일차: 전자책 구성 정리";
        description = "시화 순서, 표지, 목차, 작가 소개, 페이지 구성을 정리한 캡처 또는 편집본을 제출하세요.";
        required_capture = true;
      } else {
        title = "22일차: 전자책 PDF 제출";
        description = "정리한 시화 전자책의 최종 PDF 파일을 제출하세요.";
        required_file = true;
      }
    }

    if (challenge.type === "instagram") {
      title = `${index}일차: 인스타 릴스 제출`;
      description = "인스타 릴스 URL과 업로드 완료 캡처 이미지를 제출하세요.";
      required_link = true;
      required_capture = true;
    }

    missions.push({
      id: uid("mission"),
      challenge_id: challenge.id,
      day_number: index,
      title,
      description,
      deadline_at: `${dateAddISO(challenge.start_date, index - 1)}T${challenge.daily_deadline_time}+09:00`,
      required_page_count,
      required_link,
      required_capture,
      required_file,
    });
  }
  return missions;
}

function currentUser() {
  return state.users.find((user) => user.id === state.session?.userId);
}

function userParticipations(userId = currentUser()?.id) {
  return state.participations.filter((item) => item.user_id === userId);
}

function getChallenge(id) {
  return state.challenges.find((challenge) => challenge.id === id);
}

function getMission(id) {
  return state.missions.find((mission) => mission.id === id);
}

function getParticipation(id) {
  return state.participations.find((item) => item.id === id);
}

function getSubmission(id) {
  return state.submissions.find((item) => item.id === id);
}

function participationFor(challengeId, userId = currentUser()?.id) {
  return state.participations.find((item) => item.challenge_id === challengeId && item.user_id === userId);
}

function missionsFor(challengeId) {
  return state.missions
    .filter((mission) => mission.challenge_id === challengeId)
    .sort((a, b) => a.day_number - b.day_number);
}

function submissionsForParticipation(participationId) {
  return state.submissions.filter((submission) => submission.participation_id === participationId);
}

function submissionForMission(participationId, missionId) {
  return state.submissions.find((submission) => submission.participation_id === participationId && submission.mission_id === missionId);
}

function attachmentsFor(submissionId) {
  return state.attachments.filter((item) => item.submission_id === submissionId);
}

function likesFor(submissionId) {
  return state.likes.filter((like) => like.submission_id === submissionId);
}

function hasLiked(submissionId, userId = currentUser()?.id) {
  return state.likes.some((like) => like.submission_id === submissionId && like.user_id === userId);
}

function latestApprovedSubmission(participationId) {
  return submissionsForParticipation(participationId)
    .filter((submission) => submission.status === "approved")
    .sort((a, b) => new Date(b.submitted_at_iso || b.submitted_at) - new Date(a.submitted_at_iso || a.submitted_at))[0];
}

function challengeProgress(participation) {
  const missions = missionsFor(participation.challenge_id);
  const submissions = submissionsForParticipation(participation.id);
  const approved = submissions.filter((submission) => submission.status === "approved").length;
  return missions.length ? Math.round((approved / missions.length) * 100) : 0;
}

function challengeSnapshot(challengeId) {
  const participations = state.participations.filter((item) => item.challenge_id === challengeId);
  const participationIds = new Set(participations.map((item) => item.id));
  const submissions = state.submissions.filter((item) => participationIds.has(item.participation_id));
  const waiting = submissions.filter((item) => ["submitted", "reviewing", "needs_check"].includes(item.status)).length;
  const approved = submissions.filter((item) => item.status === "approved").length;
  const late = submissions.filter((item) => item.is_late).length;
  const completionAverage = participations.length
    ? Math.round(participations.reduce((sum, item) => sum + challengeProgress(item), 0) / participations.length)
    : 0;

  return {
    participants: participations.length,
    submissions: submissions.length,
    waiting,
    approved,
    late,
    completionAverage,
  };
}

function challengeSuccessCriteria(challenge) {
  if (challenge.type === "fairy_tale") return "22일 모두 인증 + 최종 PDF";
  if (challenge.type === "poem_art") return "22일 모두 인증 + 시화 전자책";
  if (challenge.type === "blog") return "22일 모두 인증";
  if (challenge.type === "instagram") return "22일 모두 인증";
  return "22일 모두 인증";
}

function challengeCertificationGuide(challenge) {
  if (challenge.type === "fairy_tale") return "22일 동안 하루도 빠짐없이 매일 제작한 동화 페이지와 이미지 캡처를 인증하고, 마지막 날 최종 전자책 PDF를 제출합니다.";
  if (challenge.type === "poem_art") return "22일 동안 하루도 빠짐없이 매일 작성한 시와 이미지 결과물을 인증하고, 마지막 날 시화 전자책 PDF를 제출합니다.";
  if (challenge.type === "blog") return "22일 동안 하루도 빠짐없이 매일 발행한 블로그 글 링크와 작성 완료 캡처를 제출합니다.";
  if (challenge.type === "instagram") return "22일 동안 하루도 빠짐없이 매일 업로드한 인스타 릴스 링크와 업로드 완료 캡처를 제출합니다.";
  return "22일 동안 하루도 빠짐없이 매일 결과물 링크 또는 캡처를 제출합니다.";
}

function missionPhase(mission) {
  const challenge = getChallenge(mission.challenge_id);
  if (challenge?.type === "poem_art") {
    return mission.day_number <= 20 ? "시화 제작" : "전자책 정리";
  }
  if (mission.day_number <= 20) return "본문 제작";
  if (mission.day_number === 21) return "전체 업스케일";
  return "PDF/출판 준비";
}

function renderStoryRoadmap(challenge, participation = null, framed = true) {
  if (challenge.type !== "fairy_tale") return "";

  const missions = missionsFor(challenge.id);
  const groups = [
    { label: "1-20일", title: "매일 2쪽씩 쓰기", description: "제목, 본문, 장면 설명을 쌓아 동화 초안을 완성합니다." },
    { label: "21일", title: "전체 페이지 업스케일", description: "이미지, 문장 표현, 페이지 구성을 한 번에 점검합니다." },
    { label: "22일", title: "전자책 PDF 완성", description: "최종 PDF, 표지/목차/소개글, 전자책 소개 자료를 정리합니다." },
  ];

  return `
    <section class="${framed ? "panel " : ""}roadmap-panel">
      <div class="section-title compact">
        <div>
          <h3>22일 완성 보드</h3>
          <p>AI 동화 전자책 1권을 목표로 한 진행 구조입니다.</p>
        </div>
      </div>
      <div class="roadmap-media-layout">
        <figure class="fairy-preview large">
          <a href="${fairyPreviewGif}" target="_blank" rel="noreferrer" title="GIF 크게 보기">
            <img src="${fairyPreviewGif}" alt="AI 동화 챌린지 미리보기" loading="lazy" />
          </a>
        </figure>
        <div class="roadmap">
          ${groups.map((group) => `
            <div class="roadmap-step">
              <span>${group.label}</span>
              <strong>${group.title}</strong>
              <p>${group.description}</p>
            </div>
          `).join("")}
        </div>
      </div>
      ${participation ? `
        <div class="mission-strip">
          ${missions.map((mission) => {
            const submission = submissionForMission(participation.id, mission.id);
            const stateClass = submission?.status === "approved" ? "done" : submission ? "sent" : "todo";
            return `<span class="${stateClass}" title="${escapeHtml(mission.title)}">${mission.day_number}</span>`;
          }).join("")}
        </div>
      ` : ""}
    </section>
  `;
}

function renderOperationsPulse(challengeId = null) {
  const target = challengeId ? getChallenge(challengeId) : state.challenges[0];
  if (!target) return "";
  const snapshot = challengeSnapshot(target.id);
  return `
    <section class="panel pulse-panel">
      <div class="section-title compact">
        <div>
          <h3>운영 인사이트</h3>
          <p>${escapeHtml(target.title)} 기준</p>
        </div>
      </div>
      <div class="grid four">
        <div class="metric"><span>참가자</span><strong>${snapshot.participants}</strong></div>
        <div class="metric"><span>검수 대기</span><strong>${snapshot.waiting}</strong></div>
        <div class="metric"><span>승인 제출</span><strong>${snapshot.approved}</strong></div>
        <div class="metric"><span>평균 완주율</span><strong>${snapshot.completionAverage}%</strong></div>
      </div>
      <div class="pulse-list">
        <span>마감은 KST 23:59 기준으로 기록됩니다.</span>
        <span>지각 제출은 따로 남겨 운영자가 환급 판단에 참고합니다.</span>
        <span>좋아요는 랭킹 점수에 반영됩니다.</span>
      </div>
    </section>
  `;
}

function currentMissionFor(participation) {
  const challenge = getChallenge(participation.challenge_id);
  const missions = missionsFor(challenge.id);
  const start = fileDateTime(challenge.start_date, "00:00:00");
  const now = new Date();
  const diffDays = Math.floor((now - start) / 86400000) + 1;
  const day = Math.min(Math.max(diffDays, 1), missions.length);
  return missions.find((mission) => mission.day_number === day) || missions[0];
}

function deadlineLabel(mission) {
  return new Date(mission.deadline_at).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function isMissionLate(mission) {
  return new Date() > new Date(mission.deadline_at);
}

function statusBadge(status, extra = "") {
  return `<span class="badge ${badgeClass[status] || ""}">${escapeHtml(statusLabels[status] || status)}${extra ? ` ${escapeHtml(extra)}` : ""}</span>`;
}

function paymentStatusBadge(status) {
  const badgeType = status === "paid" || status === "waived" || status === "not_billable"
    ? "success"
    : status === "billed"
      ? "primary"
      : "warning";
  return `<span class="badge ${badgeType}">${escapeHtml(paymentStatusLabels[status] || status)}</span>`;
}

function canSubmitPaidChallenge(participation) {
  return ["paid", "waived", "not_billable"].includes(participation.payment_status);
}

function typeBadge(type) {
  return `<span class="badge primary">${typeLabels[type] || type}</span>`;
}

function setPage(page, payload = {}) {
  view = { ...view, page, ...payload };
  render();
}

function setAdminPage(adminPage, payload = {}) {
  view = { ...view, page: "admin", adminPage, ...payload };
  render();
}

function logout() {
  state.session = null;
  saveState();
  view = { ...view, page: "auth", authMode: "login" };
  render();
}

function render() {
  const user = currentUser();
  if (!user) {
    app.innerHTML = `
      ${renderAuth()}
      ${renderFloatingPet(null)}
    `;
    bindAuthEvents();
    return;
  }

  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar(user)}
      ${renderCurrentPage(user)}
      ${view.page === "admin" ? "" : renderFloatingPet(user)}
    </div>
  `;
  bindCommonEvents();
  bindPageEvents();
}

function renderFloatingPet(user, placement = "fixed") {
  const target = user ? (user.role === "admin" ? "operatorGuide" : "challenges") : "auth";
  const label = user ? (user.role === "admin" ? "운영 설명 열기" : "챌린지 보기") : "챌린지 도우미";
  const placementClass = placement === "sidebar" ? " in-sidebar" : "";
  return `
    <button class="floating-pet${placementClass}" data-pet-target="${target}" type="button" aria-label="${label}" title="${label}">
      <img src="${appPetGif}" alt="" loading="lazy" />
    </button>
  `;
}

function renderTopbar(user) {
  const isAdmin = user.role === "admin";
  const nav = isAdmin
    ? [
        ["admin", "관리자"],
        ["home", "사용자 화면"],
      ]
    : [
        ["home", "홈"],
        ["challenges", "챌린지"],
        ["ranking", "랭킹"],
        ["mypage", "마이페이지"],
      ];

  return `
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark">C</span>
        <span>챌린지 매니저</span>
      </div>
      <nav class="nav">
        ${nav
          .map(([page, label]) => `<button data-nav="${page}" class="${view.page === page ? "active" : ""}">${label}</button>`)
          .join("")}
      </nav>
      <div class="user-strip">
        <span class="badge ${isAdmin ? "warning" : "primary"}">${isAdmin ? "관리자" : "사용자"}</span>
        <strong>${escapeHtml(user.nickname)}</strong>
        <button class="secondary-btn" data-action="logout">로그아웃</button>
      </div>
    </header>
  `;
}

function renderCurrentPage(user) {
  if (view.page === "admin") return renderAdmin();
  if (view.page === "home") return renderHome();
  if (view.page === "challenges") return renderChallengeList();
  if (view.page === "challengeDetail") return renderChallengeDetail(view.selectedChallengeId);
  if (view.page === "mission") return renderMission(view.selectedChallengeId);
  if (view.page === "submit") return renderSubmit(view.selectedMissionId);
  if (view.page === "submissionDetail") return renderSubmissionDetail(view.selectedSubmissionId);
  if (view.page === "ranking") return renderRanking(view.selectedChallengeId);
  if (view.page === "mypage") return renderMyPage();
  if (view.page === "account") return renderAccount();
  return renderHome();
}

function renderAuth() {
  const isLogin = view.authMode === "login";
  return `
    <main class="auth-layout">
      <section class="auth-hero">
        <div class="auth-brandline">
          <span class="brand-mark">C</span>
          <strong>챌린지 매니저</strong>
        </div>
        <h1>운영과 인증을 한 화면에서</h1>
        <p>참가 신청, 회비 확인, 매일 제출, 검수, 환급 관리까지 한 흐름으로 확인합니다.</p>
        <div class="auth-flow">
          <div><span>01</span><strong>참가 신청</strong><p>수강생이 챌린지를 선택합니다.</p></div>
          <div><span>02</span><strong>미션 제출</strong><p>매일 결과물을 남깁니다.</p></div>
          <div><span>03</span><strong>운영 검수</strong><p>관리자가 승인과 환급을 관리합니다.</p></div>
        </div>
      </section>
      <section class="auth-panel">
        <span class="badge primary">운영/인증</span>
        <h2>${isLogin ? "로그인" : "참가자 계정 만들기"}</h2>
        <p class="help-text">관리자는 운영 화면으로, 참가자는 미션 화면으로 이동합니다.</p>
        <div class="auth-tabs">
          <button class="${isLogin ? "active" : ""}" data-auth-tab="login">로그인</button>
          <button class="${!isLogin ? "active" : ""}" data-auth-tab="signup">참가자 계정 만들기</button>
        </div>
        <form class="form" id="authForm">
          <div class="field">
            <label>이메일</label>
            <input name="email" type="email" required placeholder="email@example.com" />
          </div>
          ${!isLogin ? `
            <div class="field">
              <label>닉네임</label>
              <input name="nickname" required placeholder="사용할 닉네임" />
            </div>
          ` : ""}
          <div class="field">
            <label>비밀번호</label>
            <input name="password" type="password" required placeholder="비밀번호" />
          </div>
          <button class="primary-btn" type="submit">${isLogin ? "로그인" : "가입하기"}</button>
          <p id="authMessage" class="error-text"></p>
        </form>
        <div class="demo-accounts">
          <strong>테스트 계정</strong>
          <div><span>관리자</span><code>${ownerAdminEmail} / ${ownerAdminPassword}</code></div>
          <div><span>예비 관리자</span><code>admin@demo.com / admin123</code></div>
          <div><span>참가자</span><code>user@demo.com / user123</code></div>
        </div>
      </section>
    </main>
  `;
}

function renderHome() {
  const participations = userParticipations();
  const active = participations.filter((item) => item.status === "active");
  const next = active[0];
  const mission = next ? currentMissionFor(next) : null;
  const challenge = next ? getChallenge(next.challenge_id) : null;

  return `
    <main class="page">
      <section class="section-title">
        <div>
          <h2>오늘의 챌린지</h2>
          <p>오늘 해야 할 미션과 진행 중인 챌린지를 확인하세요.</p>
        </div>
        <button class="primary-btn" data-nav="challenges">챌린지 찾기</button>
      </section>

      ${mission && challenge ? `
        <section class="mission-card">
          <div class="mission-top">
            <div>
              ${typeBadge(challenge.type)}
              <h3>${escapeHtml(mission.title)}</h3>
              <p>${escapeHtml(challenge.title)} · 마감 ${deadlineLabel(mission)}</p>
            </div>
            ${submissionForMission(next.id, mission.id) ? statusBadge(submissionForMission(next.id, mission.id).status) : `<span class="badge warning">미제출</span>`}
          </div>
          <div class="progress"><span style="width:${challengeProgress(next)}%"></span></div>
          <p class="help-text">완주율 ${challengeProgress(next)}%</p>
          <div class="card-actions">
            <button class="primary-btn" data-action="open-mission" data-challenge-id="${challenge.id}">오늘의 미션 보기</button>
            <button class="secondary-btn" data-action="open-ranking" data-challenge-id="${challenge.id}">랭킹 보기</button>
          </div>
        </section>
      ` : `
        <section class="empty">참여 중인 챌린지가 없습니다. 챌린지를 선택하고 오늘의 미션을 시작하세요.</section>
      `}

      ${challenge ? renderOperationsPulse(challenge.id) : renderOperationsPulse()}

      ${challenge ? renderStoryRoadmap(challenge, next) : ""}

      <section class="panel">
        <div class="section-title">
          <div>
            <h2>추천 챌린지</h2>
            <p>완성물까지 이어지는 챌린지만 노출합니다.</p>
          </div>
        </div>
        <div class="grid three">
          ${state.challenges.map(renderChallengeCard).join("")}
        </div>
      </section>
    </main>
  `;
}

function renderChallengeCard(challenge) {
  const participation = participationFor(challenge.id);
  const preview = challenge.type === "fairy_tale"
    ? { src: fairyPreviewGif, className: "fairy-preview", title: "GIF 크게 보기", alt: "AI 동화 챌린지 미리보기" }
    : challenge.type === "poem_art"
      ? { src: poemArtPreviewImage, className: "fairy-preview poem-preview", title: "이미지 크게 보기", alt: "시화집 챌린지 미리보기" }
      : challenge.type === "blog"
        ? { src: blogBikePreviewImage, className: "fairy-preview blog-preview", title: "이미지 크게 보기", alt: "블로그 글쓰기 챌린지 미리보기" }
        : challenge.type === "instagram"
          ? { src: instagramPreviewGif, className: "fairy-preview instagram-preview", title: "GIF 크게 보기", alt: "인스타 릴스 챌린지 미리보기" }
          : null;
  return `
    <article class="challenge-card">
      ${preview ? `
        <figure class="${preview.className} card">
          <a href="${preview.src}" target="_blank" rel="noreferrer" title="${preview.title}">
            <img src="${preview.src}" alt="${preview.alt}" loading="lazy" />
          </a>
        </figure>
      ` : ""}
      <div class="card-head">
        ${typeBadge(challenge.type)}
        ${statusBadge(challenge.status)}
      </div>
      <h3>${escapeHtml(challenge.title)}</h3>
      <p>${escapeHtml(challenge.description)}</p>
      <div class="card-meta">
        <span>기간: ${challenge.start_date} - ${challenge.end_date}</span>
        <span>회비: ${challenge.entry_fee.toLocaleString()}원</span>
        <span>완주 환급: ${challengeSuccessFee.toLocaleString()}원</span>
        ${["fairy_tale", "poem_art"].includes(challenge.type) ? `<span>AI 도구: 미드저니 유료 계정, GPT 필수, 제미나이/클로드 선택</span>` : ""}
        <span>참가자: ${state.participations.filter((item) => item.challenge_id === challenge.id).length}명</span>
      </div>
      ${participation ? `<div class="progress"><span style="width:${challengeProgress(participation)}%"></span></div>` : ""}
      <div class="card-actions">
        <button class="primary-btn" data-action="challenge-detail" data-challenge-id="${challenge.id}">${participation ? "상세/미션" : "자세히"}</button>
        <button class="secondary-btn" data-action="open-ranking" data-challenge-id="${challenge.id}">랭킹</button>
      </div>
    </article>
  `;
}

function renderChallengeList() {
  const filters = [
    ["all", "전체"],
    ["fairy_tale", "AI 동화"],
    ["poem_art", "시화"],
    ["blog", "블로그"],
    ["instagram", "인스타"],
    ["paid", "유료"],
  ];
  const challenges = state.challenges.filter((challenge) => {
    if (view.challengeFilter === "all") return true;
    if (view.challengeFilter === "paid") return challenge.is_paid;
    if (view.challengeFilter === "free") return !challenge.is_paid;
    return challenge.type === view.challengeFilter;
  });

  return `
    <main class="page">
      <section class="section-title">
        <div>
          <h2>챌린지 목록</h2>
          <p>참가할 챌린지를 선택하세요.</p>
        </div>
      </section>
      <div class="filters">
        ${filters.map(([key, label]) => `<button class="${view.challengeFilter === key ? "active" : ""}" data-filter="${key}">${label}</button>`).join("")}
      </div>
      <div class="grid three">
        ${challenges.map(renderChallengeCard).join("") || `<div class="empty">해당 조건의 챌린지가 없습니다.</div>`}
      </div>
    </main>
  `;
}

function renderChallengeDetail(challengeId) {
  const challenge = getChallenge(challengeId);
  if (!challenge) return `<main class="page"><div class="empty">챌린지를 찾을 수 없습니다.</div></main>`;

  const participation = participationFor(challenge.id);
  const missions = missionsFor(challenge.id);
  const participantCount = state.participations.filter((item) => item.challenge_id === challenge.id).length;
  return `
    <main class="page">
      <section class="detail-layout">
        <div class="panel">
          ${typeBadge(challenge.type)}
          <h2>${escapeHtml(challenge.title)}</h2>
          <p class="help-text">${escapeHtml(challenge.description)}</p>
          <div class="detail-summary">
            <div class="metric"><span>참가비</span><strong>${challenge.entry_fee.toLocaleString()}원</strong></div>
            <div class="metric"><span>성공 기준</span><strong>${escapeHtml(challengeSuccessCriteria(challenge))}</strong></div>
            <div class="metric"><span>참가자</span><strong>${participantCount}/100</strong></div>
            <div class="metric"><span>기간</span><strong>${missions.length}일</strong></div>
            <div class="metric"><span>완주 환급</span><strong>${challengeSuccessFee.toLocaleString()}원</strong></div>
            <div class="metric"><span>일정</span><strong>${challenge.start_date.slice(5)} - ${challenge.end_date.slice(5)}</strong></div>
          </div>
          <div class="detail-info-grid">
            <div class="detail-info-card">
              <h3>매일 인증 방법 (인증 안내)</h3>
              <p>${escapeHtml(challengeCertificationGuide(challenge))}</p>
            </div>
            <div class="detail-info-card">
              <h3>환급 안내</h3>
              <p>22일 동안 하루도 빠짐없이 인증하고 최종 결과물이 승인되면 20,000원 환급 조건을 충족합니다.</p>
            </div>
            ${["fairy_tale", "poem_art"].includes(challenge.type) ? `
              <div class="detail-info-card">
                <h3>AI 준비물</h3>
                <p>미드저니 유료 계정과 GPT 사용 준비는 필수이며, 제미나이 또는 클로드는 선택적으로 활용할 수 있습니다.</p>
              </div>
            ` : ""}
          </div>
          ${renderStoryRoadmap(challenge, participation, false)}
          <h3>미션 일정</h3>
          <div class="timeline">
            ${missions.map((mission) => `
              <div class="timeline-item">
                <strong>${mission.day_number}일차</strong>
                <div>
                  <b>${escapeHtml(mission.title)}</b>
                  <p class="help-text">${missionPhase(mission)} · ${escapeHtml(mission.description)} · 마감 ${deadlineLabel(mission)}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
        <aside class="panel">
          <h3>참가 정보</h3>
          <div class="card-meta">
            <span>상태: ${statusBadge(challenge.status)}</span>
            <span>환급 조건: ${escapeHtml(challenge.reward_description)}</span>
            <span>참가자: ${state.participations.filter((item) => item.challenge_id === challenge.id).length}명</span>
          </div>
          ${participation ? `
            <div class="notice">이미 참가 중입니다. 오늘의 미션을 제출하고 완주율을 올려보세요.</div>
            <div class="card-actions">
              <button class="primary-btn" data-action="open-mission" data-challenge-id="${challenge.id}">오늘의 미션 보기</button>
              <button class="secondary-btn" data-action="open-ranking" data-challenge-id="${challenge.id}">랭킹 보기</button>
            </div>
          ` : `
            <button class="primary-btn" data-action="join-challenge" data-challenge-id="${challenge.id}">참가하기</button>
            <p class="help-text">유료 챌린지는 관리자 결제 확인 후 제출할 수 있습니다.</p>
          `}
        </aside>
      </section>
    </main>
  `;
}

function renderMission(challengeId) {
  const challenge = getChallenge(challengeId);
  const participation = participationFor(challengeId);
  if (!challenge || !participation) return `<main class="page"><div class="empty">참가 정보가 없습니다.</div></main>`;

  if (challenge.is_paid && !canSubmitPaidChallenge(participation)) {
    return `
      <main class="page">
        <section class="panel">
          <h2>결제 확인 대기</h2>
          <p class="help-text">유료 챌린지는 운영자가 결제 상태를 확인한 뒤 제출할 수 있습니다.</p>
          <button class="secondary-btn" data-action="challenge-detail" data-challenge-id="${challenge.id}">상세로 돌아가기</button>
        </section>
      </main>
    `;
  }

  const mission = currentMissionFor(participation);
  const submission = submissionForMission(participation.id, mission.id);
  const late = isMissionLate(mission);
  return `
    <main class="page">
      <section class="mission-card">
        <div class="mission-top">
          <div>
            ${typeBadge(challenge.type)}
            <h2>${escapeHtml(mission.title)}</h2>
            <p>${escapeHtml(mission.description)}</p>
          </div>
          ${submission ? statusBadge(submission.status, submission.is_late ? "지각" : "") : late ? `<span class="badge warning">마감 지남</span>` : `<span class="badge primary">제출 가능</span>`}
        </div>
        <div class="grid four">
          <div class="metric"><span>일차</span><strong>${mission.day_number}</strong></div>
          <div class="metric"><span>마감</span><strong>${deadlineLabel(mission)}</strong></div>
          <div class="metric"><span>필수 링크</span><strong>${mission.required_link ? "필수" : "선택"}</strong></div>
          <div class="metric"><span>필수 파일</span><strong>${mission.required_file ? "PDF" : "없음"}</strong></div>
        </div>
        <div class="quality-panel">
          <strong>오늘 제출 기준</strong>
          <div class="quality-list">
            <span>제목과 본문 또는 설명이 함께 있어야 합니다.</span>
            <span>${challenge.type === "fairy_tale" ? "동화 페이지는 장면 설명까지 남기면 검수가 빠릅니다." : challenge.type === "poem_art" ? "시와 이미지가 한 화면에서 함께 확인되면 검수가 빠릅니다." : "외부 링크는 공개 접근이 가능해야 합니다."}</span>
            <span>${mission.required_file ? "최종 PDF 파일을 첨부해야 합니다." : "캡처 이미지는 진행 증빙으로 보관됩니다."}</span>
          </div>
        </div>
        <div class="card-actions">
          ${submission?.status === "approved" ? `
            <button class="secondary-btn" data-action="submission-detail" data-submission-id="${submission.id}">제출 상세</button>
          ` : `
            <button class="primary-btn" data-action="open-submit" data-mission-id="${mission.id}">${submission ? "수정/재제출" : "제출하기"}</button>
          `}
          <button class="secondary-btn" data-action="open-ranking" data-challenge-id="${challenge.id}">랭킹 보기</button>
        </div>
      </section>
    </main>
  `;
}

function renderSubmit(missionId) {
  const mission = getMission(missionId);
  const challenge = getChallenge(mission?.challenge_id);
  const participation = participationFor(challenge?.id);
  const existing = submissionForMission(participation?.id, missionId);

  if (!mission || !challenge || !participation) return `<main class="page"><div class="empty">제출할 미션을 찾을 수 없습니다.</div></main>`;
  if (existing?.status === "approved") return renderSubmissionDetail(existing.id);

  return `
    <main class="page">
      <section class="section-title">
        <div>
          <h2>${escapeHtml(mission.title)}</h2>
          <p>${escapeHtml(challenge.title)} · 마감 ${deadlineLabel(mission)}</p>
        </div>
      </section>
      <form class="panel form" id="submissionForm">
        <input type="hidden" name="missionId" value="${mission.id}" />
        <div class="notice ${isMissionLate(mission) ? "warning" : ""}">
          ${isMissionLate(mission) ? "현재 제출하면 지각 제출로 기록됩니다." : "필수 항목을 확인한 뒤 제출하세요."}
        </div>
        <div class="submit-checklist">
          <strong>제출 전 체크</strong>
          <label><input type="checkbox" name="quality_check" value="readable" /> 운영자가 바로 확인할 수 있게 제목과 설명을 정리했습니다.</label>
          <label><input type="checkbox" name="quality_check" value="proof" /> 링크, 캡처, PDF 중 오늘 필요한 증빙을 빠뜨리지 않았습니다.</label>
          <label><input type="checkbox" name="quality_check" value="publishable" /> AI 동화/시화 챌린지는 최종 책이나 PDF로 묶일 수 있는 흐름을 유지했습니다.</label>
        </div>
        <div class="field">
          <label>제출 제목</label>
          <input name="title" required value="${escapeHtml(existing?.title || "")}" />
        </div>
        <div class="field">
          <label>설명 또는 본문</label>
          <textarea name="body">${escapeHtml(existing?.body || "")}</textarea>
        </div>
        <div class="field">
          <label>링크 ${mission.required_link ? "(필수)" : "(선택)"}</label>
          <input name="link_url" value="${escapeHtml(existing?.link_url || "")}" placeholder="https://..." />
        </div>
        <div class="field">
          <label>캡처 이미지 ${mission.required_capture ? "(필수)" : "(선택)"}</label>
          <input name="capture_images" type="file" accept="image/png,image/jpeg,image/webp" multiple />
          <p class="help-text">최대 5장, 장당 10MB 이하를 권장합니다. 데모에서는 파일명만 저장합니다.</p>
        </div>
        <div class="field">
          <label>PDF 파일 ${mission.required_file ? "(필수)" : "(선택)"}</label>
          <input name="pdf_file" type="file" accept="application/pdf" />
        </div>
        <div class="actions-row">
          <button class="primary-btn" type="submit">제출하기</button>
          <button class="secondary-btn" type="button" data-action="open-mission" data-challenge-id="${challenge.id}">취소</button>
        </div>
        <p id="submissionMessage" class="error-text"></p>
      </form>
    </main>
  `;
}

function renderSubmissionDetail(submissionId) {
  const submission = getSubmission(submissionId);
  if (!submission) return `<main class="page"><div class="empty">제출물을 찾을 수 없습니다.</div></main>`;
  const participation = getParticipation(submission.participation_id);
  const challenge = getChallenge(participation.challenge_id);
  const mission = getMission(submission.mission_id);
  const attachments = attachmentsFor(submission.id);
  const likeCount = likesFor(submission.id).length;
  const ownedByViewer = participation.user_id === currentUser().id;
  const likedByViewer = hasLiked(submission.id);
  const likeButton = submission.status === "approved" && !ownedByViewer
    ? `<button class="secondary-btn" data-action="toggle-like" data-submission-id="${submission.id}">${likedByViewer ? "좋아요 취소" : "좋아요"}</button>`
    : "";

  return `
    <main class="page">
      <section class="panel">
        <div class="section-title">
          <div>
            <h2>${escapeHtml(submission.title)}</h2>
            <p>${escapeHtml(challenge.title)} · ${escapeHtml(mission.title)}</p>
          </div>
          ${statusBadge(submission.status, submission.is_late ? "지각" : "")}
        </div>
        <div class="grid two">
          <div>
            <h3>제출 내용</h3>
            <p class="help-text">${escapeHtml(submission.body || "본문 없음")}</p>
            ${submission.link_url ? `<p><a href="${escapeHtml(submission.link_url)}" target="_blank" rel="noreferrer">${escapeHtml(submission.link_url)}</a></p>` : ""}
          </div>
          <div>
            <h3>첨부</h3>
            <div class="file-list">
              ${attachments.map((file) => `<div class="file-pill"><span>${escapeHtml(file.type)} · ${escapeHtml(file.file_url)}</span></div>`).join("") || `<p class="help-text">첨부 없음</p>`}
            </div>
          </div>
        </div>
        ${submission.quality_checks?.length ? `
          <div class="quality-panel">
            <strong>제출 전 체크 완료</strong>
            <div class="quality-list">
              ${submission.quality_checks.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
          </div>
        ` : ""}
        <div class="notice">
          사용자 반응 ${likeCount}개
          ${likeButton}
        </div>
        ${submission.rejection_reason ? `<div class="notice danger">반려 사유: ${escapeHtml(submission.rejection_reason)}</div>` : ""}
        <div class="card-actions">
          <button class="secondary-btn" data-action="open-mission" data-challenge-id="${challenge.id}">미션으로</button>
          ${submission.status === "rejected" && submission.resubmit_count < 1 ? `<button class="primary-btn" data-action="open-submit" data-mission-id="${mission.id}">재제출</button>` : ""}
        </div>
      </section>
    </main>
  `;
}

function calculateRankings(challengeId) {
  const participations = state.participations.filter((item) => item.challenge_id === challengeId);
  const scored = participations.map((participation) => {
    const approved = submissionsForParticipation(participation.id).filter((submission) => submission.status === "approved");
    const onTime = approved.filter((submission) => !submission.is_late);
    const adminScore = approved.reduce((sum, submission) => sum + Number(submission.admin_score || 0), 0);
    const likeCount = approved.reduce((sum, submission) => sum + likesFor(submission.id).length, 0);
    const total = approved.length * 10 + onTime.length * 5 + adminScore + likeCount;
    return { participation, approvedCount: approved.length, onTimeCount: onTime.length, adminScore, likeCount, total };
  });

  scored.sort((a, b) => {
    if (b.total !== a.total) return b.total - a.total;
    if (b.onTimeCount !== a.onTimeCount) return b.onTimeCount - a.onTimeCount;
    if (b.approvedCount !== a.approvedCount) return b.approvedCount - a.approvedCount;
    return new Date(a.participation.joined_at) - new Date(b.participation.joined_at);
  });

  scored.forEach((item, index) => {
    item.participation.total_score = item.total;
    item.participation.rank = index + 1;
  });
  saveState();
  return scored;
}

function renderRanking(challengeId = null) {
  const selectedId = challengeId || state.challenges[0]?.id;
  const challenge = getChallenge(selectedId);
  const rankings = challenge ? calculateRankings(challenge.id) : [];

  return `
    <main class="page">
      <section class="section-title">
        <div>
          <h2>랭킹</h2>
          <p>승인 제출 수, 정시 제출 수, 관리자 점수, 좋아요를 합산합니다.</p>
        </div>
        <select id="rankingChallenge">
          ${state.challenges.map((item) => `<option value="${item.id}" ${item.id === selectedId ? "selected" : ""}>${escapeHtml(item.title)}</option>`).join("")}
        </select>
      </section>
      <section class="panel">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>순위</th>
                <th>닉네임</th>
                <th>총점</th>
                <th>승인</th>
                <th>정시</th>
                <th>관리자 점수</th>
                <th>좋아요</th>
                <th>제출물</th>
              </tr>
            </thead>
            <tbody>
              ${rankings.map((row, index) => {
                const user = state.users.find((item) => item.id === row.participation.user_id);
                const approvedSubmission = latestApprovedSubmission(row.participation.id);
                return `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${escapeHtml(user?.nickname || "-")}</td>
                    <td><strong>${row.total}</strong></td>
                    <td>${row.approvedCount}</td>
                    <td>${row.onTimeCount}</td>
                    <td>${row.adminScore}</td>
                    <td>${row.likeCount}</td>
                    <td>${approvedSubmission ? `<button class="secondary-btn" data-action="submission-detail" data-submission-id="${approvedSubmission.id}">보기</button>` : "-"}</td>
                  </tr>
                `;
              }).join("") || `<tr><td colspan="8">랭킹 데이터가 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  `;
}

function renderMyPage() {
  const participations = userParticipations();
  const account = state.payoutAccounts.find((item) => item.user_id === currentUser().id);
  const rewards = state.rewards.filter((reward) => participations.some((p) => p.id === reward.participation_id));

  return `
    <main class="page">
      <section class="section-title">
        <div>
          <h2>마이페이지</h2>
          <p>참여 챌린지, 제출 상태, 환급, 계좌를 확인하세요.</p>
        </div>
        <button class="primary-btn" data-nav="account">계좌 등록</button>
      </section>
      <div class="grid three">
        <div class="metric"><span>참여 챌린지</span><strong>${participations.length}</strong></div>
        <div class="metric"><span>제출 수</span><strong>${state.submissions.filter((s) => participations.some((p) => p.id === s.participation_id)).length}</strong></div>
        <div class="metric"><span>계좌 상태</span><strong>${statusLabels[account?.status || "unregistered"]}</strong></div>
      </div>
      <section class="panel">
        <h3>내 챌린지</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>챌린지</th><th>결제</th><th>완주율</th><th>점수</th><th>액션</th></tr></thead>
            <tbody>
              ${participations.map((p) => {
                const c = getChallenge(p.challenge_id);
                return `<tr>
                  <td>${escapeHtml(c.title)}</td>
                  <td>${paymentStatusBadge(p.payment_status)}</td>
                  <td>${challengeProgress(p)}%</td>
                  <td>${p.total_score || 0}</td>
                  <td><button class="secondary-btn" data-action="open-mission" data-challenge-id="${c.id}">미션</button></td>
                </tr>`;
              }).join("") || `<tr><td colspan="5">참여 중인 챌린지가 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
      <section class="panel">
        <h3>환급 상태</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>챌린지</th><th>유형</th><th>환급액</th><th>상태</th></tr></thead>
            <tbody>
              ${rewards.map((reward) => {
                const p = getParticipation(reward.participation_id);
                return `<tr><td>${escapeHtml(getChallenge(p.challenge_id).title)}</td><td>${reward.reward_type}</td><td>${reward.amount}</td><td>${statusBadge(reward.status)}</td></tr>`;
              }).join("") || `<tr><td colspan="4">환급 내역이 없습니다.</td></tr>`}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  `;
}

function renderAccount() {
  const account = state.payoutAccounts.find((item) => item.user_id === currentUser().id);
  return `
    <main class="page">
      <section class="section-title">
        <div>
          <h2>상금 수령 계좌</h2>
          <p>환급금을 받기 위한 계좌를 등록하세요.</p>
        </div>
        ${statusBadge(account?.status || "unregistered")}
      </section>
      <form class="panel form" id="accountForm">
        <div class="field"><label>예금주명</label><input name="account_holder" required value="${escapeHtml(account?.account_holder || "")}" /></div>
        <div class="field"><label>은행명</label><input name="bank_name" required value="${escapeHtml(account?.bank_name || "")}" /></div>
        <div class="field"><label>계좌번호</label><input name="account_number" required placeholder="${account ? `등록됨: ****${account.account_number_last4}` : "숫자만 입력"}" /></div>
        <div class="field"><label>연락처</label><input name="phone" required value="${escapeHtml(account?.phone || "")}" /></div>
        <label class="help-text"><input type="checkbox" name="consent" required /> 개인정보 수집 및 이용에 동의합니다.</label>
        ${account?.rejection_reason ? `<div class="notice danger">반려 사유: ${escapeHtml(account.rejection_reason)}</div>` : ""}
        <button class="primary-btn" type="submit">계좌 저장</button>
        <p id="accountMessage" class="success-text"></p>
      </form>
    </main>
  `;
}

function renderAdmin() {
  return `
    <main class="page wide">
      <section class="admin-layout">
        <aside class="sidebar">
          ${[
            ["dashboard", "대시보드"],
            ["operatorGuide", "운영 설명"],
            ["challenges", "챌린지 관리"],
            ["participants", "참가자 관리"],
            ["submissions", "제출 검수"],
            ["rankings", "랭킹 관리"],
            ["rewards", "환급 정산"],
            ["accounts", "계좌 검수"],
            ["auditLogs", "감사 로그"],
          ].map(([key, label]) => `<button class="${view.adminPage === key ? "active" : ""}" data-admin-nav="${key}">${label}</button>`).join("")}
          ${renderFloatingPet(currentUser(), "sidebar")}
        </aside>
        <section>
          ${renderAdminContent()}
        </section>
      </section>
    </main>
  `;
}

function renderAdminContent() {
  if (view.adminPage === "dashboard") return renderAdminDashboard();
  if (view.adminPage === "operatorGuide") return renderAdminGuide();
  if (view.adminPage === "challenges") return renderAdminChallenges();
  if (view.adminPage === "participants") return renderAdminParticipants();
  if (view.adminPage === "submissions") return renderAdminSubmissions();
  if (view.adminPage === "rankings") return renderAdminRankings();
  if (view.adminPage === "rewards") return renderAdminRewards();
  if (view.adminPage === "accounts") return renderAdminAccounts();
  if (view.adminPage === "auditLogs") return renderAdminAuditLogs();
  return renderAdminDashboard();
}

function renderAdminGuide() {
  const guideCards = [
    {
      title: "챌린지 한 줄 설명",
      body: "30,000원으로 참여하고, 22일 동안 하루도 빠짐없이 매일 인증하면 20,000원을 환급받는 창작 챌린지입니다.",
    },
    {
      title: "매일 인증 방법",
      body: "매일 만든 결과물을 캡처나 링크로 올립니다. AI 동화와 시화는 마지막 날 완성한 전자책 PDF까지 제출합니다.",
    },
    {
      title: "환급 조건",
      body: "22일 모두 인증하고 최종 결과물이 승인되어야 20,000원 환급 대상이 됩니다. 하루라도 빠지면 환급 대상에서 제외될 수 있습니다.",
    },
    {
      title: "AI 준비물",
      body: "AI 동화와 시화는 미드저니 유료 계정과 GPT 사용 준비가 필요합니다. 제미나이 또는 클로드는 선택으로 활용할 수 있습니다.",
    },
    {
      title: "운영자가 확인하는 것",
      body: "참가비 확인, 매일 제출 여부, 제출물 승인 여부, 계좌 검수, 환급 상태를 차례대로 확인합니다.",
    },
    {
      title: "고객에게 쉽게 말하기",
      body: "어려운 말보다 '매일 올려주세요', '22일 모두 해야 환급됩니다', '마지막에는 PDF를 냅니다'처럼 짧게 설명합니다.",
    },
  ];

  return `
    <div class="section-title">
      <div>
        <h2>운영 설명</h2>
        <p>고객에게 설명할 때 바로 사용할 수 있는 쉬운 안내 문장입니다.</p>
      </div>
    </div>
    <section class="panel operator-guide-hero">
      <span class="badge primary">고객 안내 핵심</span>
      <h3>30,000원을 내고, 22일 동안 하루도 빠짐없이 인증하면, 20,000원을 환급받을 수 있습니다.</h3>
      <p>이 문장을 기준으로 참가비, 인증, 환급 조건을 설명하면 고객이 덜 헷갈립니다.</p>
    </section>
    <section class="operator-guide-grid">
      ${guideCards.map((card) => `
        <div class="detail-info-card">
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </div>
      `).join("")}
    </section>
    <section class="panel">
      <h3>자주 받을 질문</h3>
      <div class="simple-list">
        <div class="list-row"><span><strong>하루 빠지면 환급되나요?</strong><small>22일 모두 인증해야 환급 대상입니다.</small></span></div>
        <div class="list-row"><span><strong>미드저니가 꼭 필요한가요?</strong><small>AI 동화와 시화는 미드저니 유료 계정 준비가 필요합니다.</small></span></div>
        <div class="list-row"><span><strong>제미나이나 클로드도 꼭 써야 하나요?</strong><small>아니요. 제미나이와 클로드는 선택 활용입니다.</small></span></div>
        <div class="list-row"><span><strong>최종 제출물은 무엇인가요?</strong><small>AI 동화와 시화는 최종 전자책 PDF를 제출합니다.</small></span></div>
      </div>
    </section>
  `;
}

function renderAdminDashboard() {
  const waiting = state.submissions.filter((s) => ["submitted", "reviewing", "needs_check"].includes(s.status)).length;
  const pendingSubmissions = state.submissions
    .filter((s) => ["submitted", "reviewing", "needs_check"].includes(s.status))
    .slice(-5)
    .reverse();
  const rewardSummary = ["scheduled", "held", "paid", "excluded"].map((status) => ({
    status,
    count: state.rewards.filter((reward) => reward.status === status).length,
  }));
  const recentChallenges = state.challenges.slice(-4).reverse();
  const signupNotifications = (state.signupNotifications || []).slice(0, 5);
  const adminNotes = (state.adminNotes || []).slice(0, 5);
  return `
    <div class="section-title"><div><h2>관리자 대시보드</h2><p>오늘 처리해야 할 운영 항목입니다.</p></div></div>
    <div class="grid four">
      <div class="metric"><span>챌린지</span><strong>${state.challenges.length}</strong></div>
      <div class="metric"><span>참가자</span><strong>${state.participations.length}</strong></div>
      <div class="metric"><span>검수 대기</span><strong>${waiting}</strong></div>
      <div class="metric"><span>계좌 검수</span><strong>${state.payoutAccounts.filter((a) => a.status === "pending").length}</strong></div>
    </div>
    <section class="admin-dashboard-grid">
      <div class="panel">
        <h3>최근 검토 대기 인증</h3>
        <div class="simple-list">
          ${pendingSubmissions.map((submission) => {
            const participation = getParticipation(submission.participation_id);
            const user = state.users.find((item) => item.id === participation?.user_id);
            const challenge = participation ? getChallenge(participation.challenge_id) : null;
            const mission = getMission(submission.mission_id);
            return `<button class="list-row" data-action="select-admin-submission" data-submission-id="${submission.id}">
              <span><strong>${escapeHtml(user?.nickname || "-")}</strong><small>${escapeHtml(challenge?.title || "-")} · ${mission?.day_number || "-"}일차</small></span>
              ${statusBadge(submission.status)}
            </button>`;
          }).join("") || `<div class="empty small">검토 대기 인증이 없습니다.</div>`}
        </div>
      </div>
      <div class="panel">
        <h3>환급 상태 요약</h3>
        <div class="status-summary">
          ${rewardSummary.map((item) => `<div><span>${statusLabels[item.status]}</span><strong>${item.count}</strong></div>`).join("")}
        </div>
      </div>
    </section>
    <section class="panel">
      <h3>신규 회원 알림</h3>
      <p class="help-text">실제 이메일 발송 연결 시 알림 받을 이메일: ${ownerAdminEmail}</p>
      <div class="simple-list">
        ${signupNotifications.map((notice) => `<div class="list-row">
          <span><strong>${escapeHtml(notice.nickname || "참가자")}</strong><small>${escapeHtml(notice.email)} · ${escapeHtml(notice.created_at)}</small></span>
          <span class="badge primary">가입</span>
        </div>`).join("") || `<div class="empty small">신규 회원 알림이 없습니다.</div>`}
      </div>
    </section>
    <section class="panel">
      <h3>운영 메모</h3>
      <form class="admin-note-form" id="adminNoteForm">
        <input name="note" placeholder="예: 홍길동님 입금 확인 필요, 7일차 인증 재확인" required />
        <button class="secondary-btn" type="submit">메모 추가</button>
      </form>
      <div class="simple-list">
        ${adminNotes.map((note) => `<div class="list-row">
          <span><strong>${escapeHtml(note.body)}</strong><small>${escapeHtml(note.created_at)} · ${escapeHtml(note.author || "관리자")}</small></span>
        </div>`).join("") || `<div class="empty small">아직 운영 메모가 없습니다.</div>`}
      </div>
    </section>
    <section class="panel">
      <h3>최근 챌린지</h3>
      <div class="simple-list">
        ${recentChallenges.map((challenge) => `<button class="list-row" data-action="challenge-detail" data-challenge-id="${challenge.id}">
          <span><strong>${escapeHtml(challenge.title)}</strong><small>${typeLabels[challenge.type]} · ${challenge.start_date} - ${challenge.end_date}</small></span>
          ${statusBadge(challenge.status)}
        </button>`).join("")}
      </div>
    </section>
  `;
}

function renderAdminChallenges() {
  const formTemplate = challengeTemplate("fairy_tale");
  return `
    <div class="section-title"><div><h2>챌린지 관리</h2><p>모든 챌린지는 회비 30,000원, 22일 하루도 빠짐없이 인증 완료 시 20,000원 환급 조건으로 운영합니다.</p></div></div>
    <section class="panel">
      <form class="form" id="challengeForm">
        <div class="grid two">
          <div class="field"><label>제목</label><input name="title" required value="${escapeHtml(formTemplate.title)}" /></div>
          <div class="field"><label>유형</label><select name="type"><option value="fairy_tale">AI 동화</option><option value="poem_art">시화</option><option value="blog">블로그</option><option value="instagram">인스타</option></select></div>
          <div class="field"><label>시작일</label><input name="start_date" type="date" value="${defaultChallengeStart}" required /></div>
          <div class="field"><label>회비</label><input name="entry_fee" type="number" min="0" value="${challengeEntryFee}" /></div>
        </div>
        <div class="field"><label>설명</label><textarea name="description" required>${escapeHtml(formTemplate.description)}</textarea></div>
        <div class="field"><label>조건 설명</label><input name="reward_description" required value="${escapeHtml(formTemplate.reward_description)}" /></div>
        <button class="primary-btn" type="submit">챌린지 생성</button>
      </form>
    </section>
    <section class="panel">
      <div class="table-wrap"><table>
        <thead><tr><th>제목</th><th>유형</th><th>기간</th><th>정원</th><th>고객/그룹</th><th>예상 회비</th><th>환급 상태</th><th>상태</th></tr></thead>
        <tbody>${state.challenges.map((c) => {
          const participants = state.participations.filter((item) => item.challenge_id === c.id);
          const rewards = state.rewards.filter((reward) => participants.some((p) => p.id === reward.participation_id));
          const pendingRewards = rewards.filter((reward) => ["scheduled", "held"].includes(reward.status)).length;
          return `<tr>
            <td>${escapeHtml(c.title)}<br><span class="help-text">검토 대기 ${state.submissions.filter((submission) => {
              const participation = getParticipation(submission.participation_id);
              return participation?.challenge_id === c.id && ["submitted", "reviewing", "needs_check"].includes(submission.status);
            }).length}건</span></td>
            <td>${typeLabels[c.type]}</td>
            <td>${c.start_date} - ${c.end_date}</td>
            <td>${participants.length}/100</td>
            <td>개별 참가</td>
            <td>${(participants.length * c.entry_fee).toLocaleString()}원</td>
            <td>${pendingRewards ? `${pendingRewards}건 대기` : "대기 없음"}</td>
            <td>${statusBadge(c.status)}</td>
          </tr>`;
        }).join("")}</tbody>
      </table></div>
    </section>
  `;
}

function renderAdminParticipants() {
  return `
    <div class="section-title"><div><h2>참가자 관리</h2><p>참가비 상태와 완주율을 관리합니다.</p></div></div>
    <section class="panel"><div class="table-wrap"><table>
      <thead><tr><th>사용자</th><th>챌린지</th><th>참가비 상태</th><th>완주율</th><th>액션</th></tr></thead>
      <tbody>
        ${state.participations.map((p) => {
          const u = state.users.find((user) => user.id === p.user_id);
          const c = getChallenge(p.challenge_id);
          return `<tr>
            <td>${escapeHtml(u?.nickname || "-")}</td>
            <td>${escapeHtml(c.title)}</td>
            <td>
              <select class="compact-select" data-action="payment-status" data-participation-id="${p.id}">
                ${Object.entries(paymentStatusLabels).map(([key, label]) => `<option value="${key}" ${p.payment_status === key ? "selected" : ""}>${label}</option>`).join("")}
              </select>
            </td>
            <td>${challengeProgress(p)}%</td>
            <td>${paymentStatusBadge(p.payment_status)}</td>
          </tr>`;
        }).join("") || `<tr><td colspan="5">참가자가 없습니다.</td></tr>`}
      </tbody>
    </table></div></section>
  `;
}

function renderAdminSubmissions() {
  const submissions = state.submissions.slice().sort((a, b) => new Date(b.submitted_at_iso || b.submitted_at) - new Date(a.submitted_at_iso || a.submitted_at));
  const selected = getSubmission(view.selectedAdminSubmissionId) || submissions[0];
  return `
    <div class="section-title"><div><h2>제출 검수</h2><p>제출물을 확인하고 승인, 반려, 추가 확인 처리합니다.</p></div></div>
    <section class="split">
      <div class="panel">
        <div class="table-wrap"><table>
          <thead><tr><th>제출자</th><th>챌린지</th><th>미션</th><th>상태</th><th>액션</th></tr></thead>
          <tbody>
            ${submissions.map((s) => {
              const p = getParticipation(s.participation_id);
              const u = state.users.find((user) => user.id === p.user_id);
              const c = getChallenge(p.challenge_id);
              const m = getMission(s.mission_id);
              return `<tr>
                <td>${escapeHtml(u?.nickname || "-")}</td>
                <td>${escapeHtml(c.title)}</td>
                <td>${m.day_number}일차</td>
                <td>${statusBadge(s.status, s.is_late ? "지각" : "")}</td>
                <td><button class="secondary-btn" data-action="select-admin-submission" data-submission-id="${s.id}">보기</button></td>
              </tr>`;
            }).join("") || `<tr><td colspan="5">제출물이 없습니다.</td></tr>`}
          </tbody>
        </table></div>
      </div>
      <div class="panel">
        ${selected ? renderAdminSubmissionPanel(selected) : `<div class="empty">선택된 제출물이 없습니다.</div>`}
      </div>
    </section>
  `;
}

function renderAdminSubmissionPanel(submission) {
  const mission = getMission(submission.mission_id);
  const files = attachmentsFor(submission.id);
  return `
    <h3>${escapeHtml(submission.title)}</h3>
    <p class="help-text">${escapeHtml(mission.title)} · ${submission.submitted_at}</p>
    ${statusBadge(submission.status, submission.is_late ? "지각" : "")}
    <p>${escapeHtml(submission.body || "")}</p>
    ${submission.link_url ? `<p><a href="${escapeHtml(submission.link_url)}" target="_blank" rel="noreferrer">${escapeHtml(submission.link_url)}</a></p>` : ""}
    <div class="file-list">${files.map((f) => `<div class="file-pill">${escapeHtml(f.type)} · ${escapeHtml(f.file_url)}</div>`).join("") || `<p class="help-text">첨부 없음</p>`}</div>
    ${submission.quality_checks?.length ? `
      <div class="quality-panel">
        <strong>제출자가 확인한 기준</strong>
        <div class="quality-list">
          ${submission.quality_checks.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>
    ` : ""}
    <form class="form" id="reviewForm">
      <input type="hidden" name="submissionId" value="${submission.id}" />
      <div class="field"><label>관리자 점수</label><input name="admin_score" type="number" min="0" max="20" value="${submission.admin_score || 0}" /></div>
      <div class="field"><label>반려 사유</label><textarea name="rejection_reason">${escapeHtml(submission.rejection_reason || "")}</textarea></div>
      <div class="actions-row">
        <button class="primary-btn" name="result" value="approved">승인</button>
        <button class="danger-btn" name="result" value="rejected">반려</button>
        <button class="secondary-btn" name="result" value="needs_check">추가 확인</button>
      </div>
    </form>
  `;
}

function renderAdminRankings() {
  return `
    <div class="section-title"><div><h2>랭킹 관리</h2><p>챌린지별 점수와 순위를 확인합니다.</p></div></div>
    ${state.challenges.map((challenge) => {
      const rankings = calculateRankings(challenge.id);
      return `<section class="panel">
        <h3>${escapeHtml(challenge.title)}</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>순위</th><th>사용자</th><th>총점</th><th>승인</th><th>정시</th><th>좋아요</th></tr></thead>
          <tbody>${rankings.map((row, index) => {
            const u = state.users.find((user) => user.id === row.participation.user_id);
            return `<tr><td>${index + 1}</td><td>${escapeHtml(u?.nickname || "-")}</td><td>${row.total}</td><td>${row.approvedCount}</td><td>${row.onTimeCount}</td><td>${row.likeCount}</td></tr>`;
          }).join("") || `<tr><td colspan="6">데이터 없음</td></tr>`}</tbody>
        </table></div>
      </section>`;
    }).join("")}
  `;
}

function renderAdminRewards() {
  ensureRewards();
  return `
    <div class="section-title"><div><h2>환급 관리</h2><p>22일 하루도 빠짐없이 인증한 참가자의 20,000원 환급 상태를 관리합니다.</p></div></div>
    <section class="panel"><div class="table-wrap"><table>
      <thead><tr><th>사용자</th><th>챌린지</th><th>유형</th><th>환급액</th><th>상태</th><th>액션</th></tr></thead>
      <tbody>${state.rewards.map((reward) => {
        const p = getParticipation(reward.participation_id);
        const u = state.users.find((user) => user.id === p.user_id);
        const c = getChallenge(p.challenge_id);
        return `<tr>
          <td>${escapeHtml(u?.nickname || "-")}</td>
          <td>${escapeHtml(c.title)}</td>
          <td>${reward.reward_type}</td>
          <td>${reward.amount}</td>
          <td>${statusBadge(reward.status)}</td>
          <td class="actions-row">
            ${["scheduled", "held", "paid", "excluded"].map((status) => `<button class="secondary-btn" data-action="reward-status" data-reward-id="${reward.id}" data-status="${status}">${statusLabels[status]}</button>`).join("")}
          </td>
        </tr>`;
      }).join("") || `<tr><td colspan="6">환급 데이터가 없습니다.</td></tr>`}</tbody>
    </table></div></section>
  `;
}

function renderAdminAccounts() {
  return `
    <div class="section-title"><div><h2>계좌 검수</h2><p>환급금 지급을 위한 계좌 상태를 관리합니다.</p></div></div>
    <section class="panel"><div class="table-wrap"><table>
      <thead><tr><th>사용자</th><th>예금주</th><th>은행</th><th>계좌</th><th>상태</th><th>액션</th></tr></thead>
      <tbody>${state.payoutAccounts.map((account) => {
        const u = state.users.find((user) => user.id === account.user_id);
        return `<tr>
          <td>${escapeHtml(u?.nickname || "-")}</td>
          <td>${escapeHtml(account.account_holder)}</td>
          <td>${escapeHtml(account.bank_name)}</td>
          <td>****${escapeHtml(account.account_number_last4)}</td>
          <td>${statusBadge(account.status)}</td>
          <td class="actions-row">
            <button class="primary-btn" data-action="account-status" data-account-id="${account.id}" data-status="approved">승인</button>
            <button class="danger-btn" data-action="account-status" data-account-id="${account.id}" data-status="rejected">반려</button>
          </td>
        </tr>`;
      }).join("") || `<tr><td colspan="6">등록된 계좌가 없습니다.</td></tr>`}</tbody>
    </table></div></section>
  `;
}

function renderAdminAuditLogs() {
  const logs = state.auditLogs || [];
  return `
    <div class="section-title"><div><h2>감사 로그</h2><p>관리자가 처리한 검수, 환급, 계좌 변경 기록을 확인합니다.</p></div></div>
    <section class="panel">
      <div class="table-wrap"><table>
        <thead><tr><th>시간</th><th>관리자</th><th>작업</th><th>대상</th><th>내용</th></tr></thead>
        <tbody>${logs.map((log) => `<tr>
          <td>${escapeHtml(log.created_at)}</td>
          <td>${escapeHtml(log.actor)}</td>
          <td>${escapeHtml(log.action)}</td>
          <td>${escapeHtml(log.target)}</td>
          <td>${escapeHtml(log.detail)}</td>
        </tr>`).join("") || `<tr><td colspan="5">아직 기록된 작업이 없습니다.</td></tr>`}</tbody>
      </table></div>
    </section>
  `;
}

function ensureRewards() {
  state.participations.forEach((participation) => {
    const existingReward = state.rewards.find((reward) => reward.participation_id === participation.id);
    if (existingReward) {
      existingReward.reward_type = "환급";
      existingReward.amount = challengeSuccessFee;
      existingReward.memo = "22일 완주 환급";
      return;
    }
    const progress = challengeProgress(participation);
    if (progress < 100) return;
    state.rewards.push({
      id: uid("reward"),
      participation_id: participation.id,
      reward_type: "환급",
      amount: challengeSuccessFee,
      status: "scheduled",
      paid_at: "",
      memo: "22일 완주 환급",
      updated_by: currentUser()?.id || "",
    });
  });
  saveState();
}

function bindAuthEvents() {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      view.authMode = button.dataset.authTab;
      render();
    });
  });

  document.querySelector("#authForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const message = document.querySelector("#authMessage");

    if (view.authMode === "signup") {
      const nickname = String(form.get("nickname")).trim();
      if (state.users.some((user) => user.email === email)) {
        message.textContent = "이미 가입된 이메일입니다.";
        return;
      }
      const user = { id: uid("user"), email, password, nickname, role: "user", created_at: nowText() };
      state.users.push(user);
      addSignupNotification(user);
      state.session = { userId: user.id };
      saveState();
      setPage("home");
      return;
    }

    const user = state.users.find((item) => item.email === email && item.password === password);
    if (!user) {
      message.textContent = "이메일 또는 비밀번호를 확인하세요.";
      return;
    }
    state.session = { userId: user.id };
    saveState();
    setPage(user.role === "admin" ? "admin" : "home");
  });
}

function bindCommonEvents() {
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.nav));
  });
  document.querySelector("[data-pet-target]")?.addEventListener("click", (event) => {
    const target = event.currentTarget.dataset.petTarget;
    if (target === "operatorGuide") setAdminPage("operatorGuide");
    else setPage(target);
  });
  document.querySelector("[data-action='logout']")?.addEventListener("click", logout);
}

function bindPageEvents() {
  document.querySelectorAll("[data-admin-nav]").forEach((button) => {
    button.addEventListener("click", () => setAdminPage(button.dataset.adminNav));
  });
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      view.challengeFilter = button.dataset.filter;
      render();
    });
  });
  document.querySelectorAll("[data-action]").forEach((button) => {
    const action = button.dataset.action;
    if (action === "challenge-detail") button.addEventListener("click", () => setPage("challengeDetail", { selectedChallengeId: button.dataset.challengeId }));
    if (action === "open-mission") button.addEventListener("click", () => setPage("mission", { selectedChallengeId: button.dataset.challengeId }));
    if (action === "open-submit") button.addEventListener("click", () => setPage("submit", { selectedMissionId: button.dataset.missionId }));
    if (action === "submission-detail") button.addEventListener("click", () => setPage("submissionDetail", { selectedSubmissionId: button.dataset.submissionId }));
    if (action === "toggle-like") button.addEventListener("click", () => toggleLike(button.dataset.submissionId));
    if (action === "open-ranking") button.addEventListener("click", () => setPage("ranking", { selectedChallengeId: button.dataset.challengeId }));
    if (action === "join-challenge") button.addEventListener("click", () => joinChallenge(button.dataset.challengeId));
    if (action === "select-admin-submission") button.addEventListener("click", () => setAdminPage("submissions", { selectedAdminSubmissionId: button.dataset.submissionId }));
    if (action === "mark-paid") button.addEventListener("click", () => markPaid(button.dataset.participationId));
    if (action === "reward-status") button.addEventListener("click", () => updateReward(button.dataset.rewardId, button.dataset.status));
    if (action === "account-status") button.addEventListener("click", () => updateAccount(button.dataset.accountId, button.dataset.status));
  });
  document.querySelectorAll("[data-action='payment-status']").forEach((select) => {
    select.addEventListener("change", () => updatePaymentStatus(select.dataset.participationId, select.value));
  });

  document.querySelector("#submissionForm")?.addEventListener("submit", handleSubmission);
  document.querySelector("#accountForm")?.addEventListener("submit", handleAccount);
  document.querySelector("#adminNoteForm")?.addEventListener("submit", handleAdminNoteCreate);
  document.querySelector("#challengeForm")?.addEventListener("submit", handleChallengeCreate);
  document.querySelector("#challengeForm select[name='type']")?.addEventListener("change", (event) => {
    applyChallengeTemplateToForm(event.currentTarget.form, event.currentTarget.value);
  });
  document.querySelector("#reviewForm")?.addEventListener("submit", handleReview);
  document.querySelector("#rankingChallenge")?.addEventListener("change", (event) => setPage("ranking", { selectedChallengeId: event.target.value }));
}

function applyChallengeTemplateToForm(form, type) {
  const template = challengeTemplate(type);
  form.elements.title.value = template.title;
  form.elements.description.value = template.description;
  form.elements.reward_description.value = template.reward_description;
  form.elements.entry_fee.value = challengeEntryFee;
  form.elements.start_date.value = defaultChallengeStart;
}

function joinChallenge(challengeId) {
  if (participationFor(challengeId)) return;
  const challenge = getChallenge(challengeId);
  state.participations.push({
    id: uid("participation"),
    user_id: currentUser().id,
    challenge_id: challengeId,
    payment_status: challenge.is_paid ? "billing_scheduled" : "not_billable",
    status: "active",
    joined_at: nowText(),
    total_score: 0,
    rank: null,
  });
  saveState();
  setPage("challengeDetail", { selectedChallengeId: challengeId });
}

function handleSubmission(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const mission = getMission(String(form.get("missionId")));
  const challenge = getChallenge(mission.challenge_id);
  const participation = participationFor(challenge.id);
  const message = document.querySelector("#submissionMessage");
  const title = String(form.get("title")).trim();
  const body = String(form.get("body")).trim();
  const link = String(form.get("link_url")).trim();
  const captures = event.currentTarget.querySelector("input[name='capture_images']").files;
  const pdf = event.currentTarget.querySelector("input[name='pdf_file']").files[0];
  const qualityChecks = form.getAll("quality_check");

  if (qualityChecks.length < 3) {
    message.textContent = "제출 전 체크 3가지를 모두 확인하세요.";
    return;
  }
  if (mission.required_link && !link) {
    message.textContent = "필수 링크를 입력하세요.";
    return;
  }
  if (challenge.type === "blog" && link && !/^https?:\/\//i.test(link)) {
    message.textContent = "블로그 링크는 http:// 또는 https://로 시작해야 합니다.";
    return;
  }
  if (challenge.type === "instagram" && link && !/(instagram\.com|instagr\.am)/i.test(link)) {
    message.textContent = "인스타 링크는 instagram.com 또는 instagr.am을 포함해야 합니다.";
    return;
  }
  if (mission.required_capture && captures.length < 1) {
    message.textContent = "필수 캡처 이미지를 업로드하세요.";
    return;
  }
  if (captures.length > 5) {
    message.textContent = "캡처 이미지는 최대 5장까지 업로드할 수 있습니다.";
    return;
  }
  if (mission.required_file && !pdf) {
    message.textContent = "PDF 파일을 업로드하세요.";
    return;
  }

  let submission = submissionForMission(participation.id, mission.id);
  const isResubmit = submission?.status === "rejected";
  if (!submission) {
    submission = {
      id: uid("submission"),
      participation_id: participation.id,
      mission_id: mission.id,
      resubmit_count: 0,
    };
    state.submissions.push(submission);
  }

  submission.title = title;
  submission.body = body;
  submission.link_url = link;
  submission.file_url = pdf?.name || submission.file_url || "";
  submission.submitted_at = nowText();
  submission.submitted_at_iso = new Date().toISOString();
  submission.status = "submitted";
  submission.is_late = isMissionLate(mission);
  submission.quality_checks = qualityChecks;
  submission.rejection_reason = "";
  submission.admin_score = 0;
  submission.reviewed_by = "";
  submission.reviewed_at = "";
  if (isResubmit) submission.resubmit_count += 1;

  state.attachments = state.attachments.filter((item) => item.submission_id !== submission.id);
  Array.from(captures).forEach((file) => {
    state.attachments.push({
      id: uid("attachment"),
      submission_id: submission.id,
      type: "capture",
      file_url: file.name,
      file_size: file.size,
      mime_type: file.type,
      caption: "캡처 이미지",
    });
  });
  if (pdf) {
    state.attachments.push({
      id: uid("attachment"),
      submission_id: submission.id,
      type: "pdf",
      file_url: pdf.name,
      file_size: pdf.size,
      mime_type: pdf.type,
      caption: "PDF 파일",
    });
  }

  saveState();
  setPage("submissionDetail", { selectedSubmissionId: submission.id });
}

function handleAccount(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const accountNumber = String(form.get("account_number")).trim();
  let account = state.payoutAccounts.find((item) => item.user_id === currentUser().id);
  if (!account) {
    account = { id: uid("account"), user_id: currentUser().id };
    state.payoutAccounts.push(account);
  }
  account.account_holder = String(form.get("account_holder")).trim();
  account.bank_name = String(form.get("bank_name")).trim();
  account.account_number_encrypted = btoa(accountNumber);
  account.account_number_last4 = accountNumber.slice(-4);
  account.phone = String(form.get("phone")).trim();
  account.consented_at = nowText();
  account.status = "pending";
  account.rejection_reason = "";
  saveState();
  render();
}

function handleAdminNoteCreate(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const body = String(form.get("note")).trim();
  if (!body) return;
  state.adminNotes = state.adminNotes || [];
  state.adminNotes.unshift({
    id: uid("note"),
    body,
    author: currentUser()?.nickname || currentUser()?.email || "관리자",
    created_at: nowText(),
  });
  state.adminNotes = state.adminNotes.slice(0, 50);
  addAuditLog("운영 메모 작성", "관리자 대시보드", body);
  saveState();
  render();
}

function handleChallengeCreate(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const type = String(form.get("type"));
  const start = String(form.get("start_date"));
  const challenge = {
    id: uid("challenge"),
    type,
    title: String(form.get("title")).trim(),
    description: String(form.get("description")).trim(),
    start_date: start,
    end_date: defaultChallengeEnd,
    daily_deadline_time: "23:59:00",
    entry_fee: challengeEntryFee,
    is_paid: true,
    status: "open",
    reward_description: ["fairy_tale", "poem_art"].includes(type) ? `${challengeFeeDescription}, ${aiToolConditionDescription}` : challengeFeeDescription,
  };
  state.challenges.push(challenge);
  state.missions.push(...buildMissions(challenge));
  addAuditLog("챌린지 생성", challenge.title, `${typeLabels[type]} · ${start} 시작`);
  saveState();
  setAdminPage("challenges");
}

function handleReview(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const submission = getSubmission(String(form.get("submissionId")));
  const result = event.submitter.value;
  const reason = String(form.get("rejection_reason")).trim();
  if (result === "rejected" && !reason) {
    alert("반려 사유를 입력하세요.");
    return;
  }
  submission.status = result;
  submission.rejection_reason = result === "rejected" ? reason : "";
  submission.admin_score = result === "approved" ? Math.max(0, Math.min(20, Number(form.get("admin_score") || 0))) : 0;
  submission.reviewed_by = currentUser().id;
  submission.reviewed_at = nowText();
  addAuditLog("제출 검수", submission.title, statusLabels[result] || result);
  saveState();
  setAdminPage("submissions", { selectedAdminSubmissionId: submission.id });
}

function markPaid(participationId) {
  const participation = getParticipation(participationId);
  participation.payment_status = "paid";
  const challenge = getChallenge(participation.challenge_id);
  addAuditLog("참가비 확인", challenge.title, "결제 완료 처리");
  saveState();
  render();
}

function updatePaymentStatus(participationId, status) {
  const participation = getParticipation(participationId);
  if (!participation) return;
  const challenge = getChallenge(participation.challenge_id);
  participation.payment_status = status;
  addAuditLog("참가비 상태 변경", challenge.title, paymentStatusLabels[status] || status);
  saveState();
  render();
}

function toggleLike(submissionId) {
  const submission = getSubmission(submissionId);
  if (!submission || submission.status !== "approved") return;
  const participation = getParticipation(submission.participation_id);
  if (participation.user_id === currentUser().id) {
    alert("본인 제출물에는 좋아요를 누를 수 없습니다.");
    return;
  }
  const existing = state.likes.find((like) => like.submission_id === submissionId && like.user_id === currentUser().id);
  if (existing) {
    state.likes = state.likes.filter((like) => like.id !== existing.id);
  } else {
    state.likes.push({
      id: uid("like"),
      submission_id: submissionId,
      user_id: currentUser().id,
      created_at: nowText(),
    });
  }
  saveState();
  setPage("submissionDetail", { selectedSubmissionId: submissionId });
}

function updateReward(rewardId, status) {
  const reward = state.rewards.find((item) => item.id === rewardId);
  if (!reward) return;
  if (status === "paid") {
    const participation = getParticipation(reward.participation_id);
    const account = state.payoutAccounts.find((item) => item.user_id === participation.user_id);
    if (!account || account.status !== "approved") {
      alert("승인된 계좌가 있어야 지급 완료 처리할 수 있습니다.");
      return;
    }
    reward.paid_at = nowText();
  }
  reward.status = status;
  reward.updated_by = currentUser().id;
  const participation = getParticipation(reward.participation_id);
  const challenge = getChallenge(participation.challenge_id);
  addAuditLog("환급 상태 변경", challenge.title, statusLabels[status] || status);
  saveState();
  render();
}

function updateAccount(accountId, status) {
  const account = state.payoutAccounts.find((item) => item.id === accountId);
  if (!account) return;
  account.status = status;
  account.rejection_reason = status === "rejected" ? "계좌 정보를 다시 확인해주세요." : "";
  account.reviewed_by = currentUser().id;
  account.reviewed_at = nowText();
  const user = state.users.find((item) => item.id === account.user_id);
  addAuditLog("계좌 검수", user?.email || account.account_holder, statusLabels[status] || status);
  saveState();
  render();
}

render();
