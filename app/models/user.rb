class User < ActiveRecord::Base
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

  has_many :questions, foreign_key: :author_id
  has_many :answers, class_name: "QuestionAnswer", foreign_key: :author_id
  has_many :views, class_name: "QuestionView"
  has_many :viewed_questions, through: :views, source: :question

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    token = SecureRandom.urlsafe_base64(16)

    User.find_by_session_token(token).nil? ? token : User.generate_session_token
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  private
    def ensure_session_token
      self.session_token ||= User.generate_session_token
    end
end
