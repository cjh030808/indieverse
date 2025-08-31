-- ========= 1. 역할 정의 테이블 (Role Definition Table) =========
-- 역할을 코드가 아닌 데이터로 관리하여 명확성과 확장성을 높입니다.
CREATE TABLE roles (
  id INT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- 기본 역할 데이터 삽입
INSERT INTO roles (id, name) VALUES (0, 'fan'), (1, 'band_member'), (2, 'admin');


-- ========= 2. 핵심 엔티티 테이블 (Core Entity Tables) =========

-- 사용자 프로필 (팬, 밴드 멤버 공통)
-- 'roles' 테이블을 참조하도록 role_id를 수정했습니다.
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, -- auth.users에서 삭제되면 프로필도 삭제
  username TEXT UNIQUE NOT NULL,
  role_id INT NOT NULL DEFAULT 0 REFERENCES roles(id),
  image_url TEXT
);

-- 밴드 상세 정보
-- 밴드를 생성한 소유자(owner_id)를 명시적으로 연결합니다.
CREATE TABLE bands (
  id SERIAL PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- 소유자가 탈퇴해도 밴드는 남도록 SET NULL
  band_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ========= 3. 관계 정의 테이블 (Junction Tables) =========

-- 밴드 멤버 정보
-- ON DELETE CASCADE를 추가하여 데이터 정합성을 강화합니다.
CREATE TABLE band_members (
  id SERIAL PRIMARY KEY,
  band_id INT NOT NULL REFERENCES bands(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  position TEXT,
  UNIQUE (band_id, profile_id) -- 한 명의 멤버가 같은 밴드에 중복으로 속할 수 없도록 설정
);

-- 팬-밴드 구독 관계
-- ON DELETE CASCADE를 추가합니다.
CREATE TABLE subscriptions (
  fan_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  band_id INT NOT NULL REFERENCES bands(id) ON DELETE CASCADE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (fan_id, band_id)
);


-- ========= 4. 기능별 데이터 테이블 (Feature-specific Tables) =========

-- 멤버별 스토리
-- ON DELETE CASCADE를 추가합니다.
CREATE TABLE stories (
  id SERIAL PRIMARY KEY,
  member_id INT NOT NULL REFERENCES band_members(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL, -- 'image' or 'video'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 공식 스케줄
-- ON DELETE CASCADE를 추가합니다.
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  band_id INT NOT NULL REFERENCES bands(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  location TEXT,
  ticket_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 굿즈 커뮤니티 게시물
-- ON DELETE CASCADE를 추가합니다.
CREATE TABLE goods_posts (
  id SERIAL PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- (참고) '인디 패스포트' 관련 테이블도 ON DELETE CASCADE를 적용하여 포함했습니다.
-- 티켓 아카이브
CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ticket_image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  diary_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 티켓에 첨부된 개인 미디어
CREATE TABLE ticket_media (
  id SERIAL PRIMARY KEY,
  ticket_id INT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ========= 5. 성능 향상을 위한 인덱스 생성 (Index Creation) =========
-- 자주 조회되는 외래 키 컬럼에 인덱스를 추가하여 읽기 성능을 최적화합니다.

CREATE INDEX idx_profiles_role_id ON profiles(role_id);
CREATE INDEX idx_bands_owner_id ON bands(owner_id);
CREATE INDEX idx_band_members_band_id ON band_members(band_id);
CREATE INDEX idx_band_members_profile_id ON band_members(profile_id);
CREATE INDEX idx_subscriptions_band_id ON subscriptions(band_id);
CREATE INDEX idx_stories_member_id ON stories(member_id);
CREATE INDEX idx_schedules_band_id ON schedules(band_id);
CREATE INDEX idx_goods_posts_author_id ON goods_posts(author_id);
CREATE INDEX idx_tickets_owner_id ON tickets(owner_id);
CREATE INDEX idx_ticket_media_ticket_id ON ticket_media(ticket_id);